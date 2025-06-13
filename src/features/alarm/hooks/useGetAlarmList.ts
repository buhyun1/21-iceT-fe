import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import getAlarmList from '../api/getAlarmList';

const useGetAlarmList = (receiverId: number) => {
  return useInfiniteQuery({
    queryKey: queryKeys.post.my,
    queryFn: ({ pageParam }) => getAlarmList({ pageParam, receiverId }),
    initialPageParam: null as number | null,
    getNextPageParam: lastPage => {
      return lastPage.has_next ? lastPage.last_alarm_id : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });
};

export default useGetAlarmList;
