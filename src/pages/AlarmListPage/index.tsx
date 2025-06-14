import useConfirmAlarm from '@/features/alarm/hooks/useConfirmAlarm';
import useGetAlarmList from '@/features/alarm/hooks/useGetAlarmList';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import PageHeader from '@/shared/layout/PageHeader';
import { formatDate } from '@/utils/formatDate';
import { useLocation, useNavigate } from 'react-router-dom';

// 알람 데이터 타입 정의 (실제 API 응답 구조에 맞춤)
interface IAlarm {
  senderNickname: string;
  alarmType: string;
  createdAt: string;
}

const AlarmListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const receiverId = location.state.receiverId || undefined;

  const {
    data: AlarmListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isAlarmsLoading,
  } = useGetAlarmList(receiverId);
  console.log(AlarmListData);

  const lastAlarmRef = useInfiniteScroll({
    isLoading: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const AlarmConfirmMutation = useConfirmAlarm();

  const alarmLength = AlarmListData?.pages[0].totalCount;

  // 모든 페이지의 알람을 하나의 배열로 합치기
  const allAlarms = AlarmListData?.pages?.flatMap(page => page.alarms) || [];

  // 알람 타입별 아이콘 반환
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'COMMENT':
        return '💬';
      case 'LIKE':
        return '❤️';
      default:
        return '📢';
    }
  };

  // 알람 메시지 생성 ex) "Helen님이 댓글을 남겼습니다" 형식
  const getNotificationMessage = (alarm: IAlarm) => {
    return `${alarm.senderNickname}님이 ${getNotificationText(alarm.alarmType)} 남겼습니다`;
  };

  // 알람 타입 한글 -> 영어 변환
  const getNotificationText = (type: string) => {
    switch (type) {
      case 'COMMENT':
        return '댓글을';
      case 'LIKE':
        return '좋아요를';
      default:
        return '공지';
    }
  };

  const handleAlarmClick = (postId: number, alarmId: number) => {
    try {
      AlarmConfirmMutation.mutate(
        { alarmId, userId: receiverId },
        {
          onSuccess: () => {
            navigate(`/post/${postId}`);
          },
        }
      );
    } catch {
      alert('존재하지 않는 알람입니다');
    }
    navigate(`/post/${postId}`);
  };

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="알람" />
      <div className="px-4">
        {/* 알람 목록 */}
        <div className="space-y-2">
          {!isAlarmsLoading && allAlarms.length === 0 ? (
            // 알람이 없을 때
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <p className="text-gray-500">알림이 없습니다</p>
            </div>
          ) : (
            <>
              <p className="mb-4">{alarmLength}개의 알람이 있습니다</p>
              {allAlarms.map((alarm, index) => {
                const isLastAlarm = index === allAlarms.length - 1;

                return (
                  <div
                    key={alarm.id}
                    ref={isLastAlarm ? lastAlarmRef : null}
                    onClick={() => handleAlarmClick(alarm.postId, alarm.id)}
                    className={`
                  p-4 rounded-lg border cursor-pointer transition-colors
                  bg-blue-50 border-blue-200
                  hover:bg-gray-50
                `}
                  >
                    <div className="flex items-start gap-3">
                      {/* 알람 아이콘 */}
                      <div className="flex-shrink-0 text-xl">
                        {getNotificationIcon(alarm.alarmType)}
                      </div>

                      {/* 알람 내용 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm text-gray-900">
                            {getNotificationMessage(alarm)}
                          </h3>

                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{formatDate(alarm.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* 추가 로딩 인디케이터 */}
          {isFetchingNextPage && (
            <div className="py-4 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                추가 알람을 불러오는 중...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmListPage;
