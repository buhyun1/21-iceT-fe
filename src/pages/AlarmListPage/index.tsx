import AlarmItem from '@/features/alarm/components/AlarmItem';
import useGetAlarmList from '@/features/alarm/hooks/useGetAlarmList';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import PageHeader from '@/shared/layout/PageHeader';
import { useLocation } from 'react-router-dom';

const AlarmListPage = () => {
  const location = useLocation();
  const receiverId = location.state.receiverId || undefined;

  const {
    data: AlarmListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isAlarmsLoading,
  } = useGetAlarmList(receiverId);

  const lastAlarmRef = useInfiniteScroll({
    isLoading: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const alarmLength = AlarmListData?.pages[0].totalCount;
  const allAlarms = AlarmListData?.pages?.flatMap(page => page.alarms) || [];

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
                  <div key={alarm.id} ref={isLastAlarm ? lastAlarmRef : null}>
                    <AlarmItem {...alarm} />
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
