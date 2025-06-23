// src/features/alarm/hooks/useGetAlarmCountWithExistingAPI.ts
import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import getAlarmList from '../api/getAlarmList';

const useGetAlarmCount = (receiverId: number) => {
  return useQuery({
    queryKey: [...queryKeys.alarm.all, 'count-only', receiverId],
    queryFn: () => getAlarmList({ receiverId, pageParam: null }),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
    refetchOnWindowFocus: true,
    enabled: !!receiverId,
    select: data => ({
      totalCount: data.totalCount,
      // 읽지 않은 알람 개수는 알람에 isRead 필드가 있다면 계산 가능
      // 현재 Alarm 타입에는 isRead가 없으므로 totalCount만 반환
      unreadCount: data.totalCount,
    }),
  });
};

export default useGetAlarmCount;
