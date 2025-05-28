import { useQuery } from '@tanstack/react-query';
import { getUserStudyStats } from '../api';
import { queryKeys } from '@/constants/queryKeys';

/**
 * 사용자 알고리즘 스탯 조회
 */
export const useUserStats = () => {
  return useQuery({
    queryKey: queryKeys.users.stats,
    queryFn: () => getUserStudyStats(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 3,
  });
};
