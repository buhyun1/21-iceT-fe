import PageHeader from '@/shared/layout/PageHeader';
import { formatDate } from '@/utils/formatDate';
import { useNavigate } from 'react-router-dom';

// 알람 데이터 타입 정의 (실제 API 응답 구조에 맞춤)
interface IAlarm {
  id: number;
  post_id: number;
  sender_id: number;
  sender_name: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const AlarmListPage = () => {
  const navigate = useNavigate();

  const dummyAlarmList = {
    alarms: [
      {
        id: 200,
        post_id: 123,
        sender_id: 5,
        sender_name: 'Helen',
        type: '댓글',
        is_read: false,
        created_at: '2025-04-26T10:00:00',
      },
      {
        id: 198,
        post_id: 122,
        sender_id: 6,
        sender_name: 'John',
        type: '좋아요',
        is_read: true,
        created_at: '2025-04-25T09:20:00',
      },
    ],
    last_alarm_id: 198,
    has_next: true,
  };

  // 알람 타입별 아이콘 반환
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case '댓글':
        return '💬';
      case '좋아요':
        return '❤️';
      default:
        return '📢';
    }
  };

  // 알람 메시지 생성 ex) "Helen님이 댓글을 남겼습니다" 형식
  const getNotificationMessage = (alarm: IAlarm) => {
    return `${alarm.sender_name}님이 ${alarm.type}을 남겼습니다`;
  };

  const handleAlarmClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="알람" />
      <div className="px-4">
        {/* 알람 목록 */}
        <div className="space-y-2">
          {dummyAlarmList.alarms.length > 0 ? (
            dummyAlarmList.alarms.map(alarm => (
              <div
                key={alarm.id}
                onClick={() => handleAlarmClick(alarm.post_id)}
                className={`
                  p-4 rounded-lg border cursor-pointer transition-colors
                  ${alarm.is_read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}
                  hover:bg-gray-50
                `}
              >
                <div className="flex items-start gap-3">
                  {/* 알람 아이콘 */}
                  <div className="flex-shrink-0 text-xl">{getNotificationIcon(alarm.type)}</div>

                  {/* 알람 내용 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3
                        className={`font-semibold text-sm ${
                          alarm.is_read ? 'text-gray-700' : 'text-gray-900'
                        }`}
                      >
                        {getNotificationMessage(alarm)}
                      </h3>
                      {!alarm.is_read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{formatDate(alarm.created_at)}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <p className="text-gray-500">알림이 없습니다</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlarmListPage;
