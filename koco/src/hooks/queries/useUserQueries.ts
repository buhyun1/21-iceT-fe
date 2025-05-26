import { getUserProfile, getUserStudyStats } from '@/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

/**
 * 사용자 프로필 정보 조회
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.users.profile,
    queryFn: () => getUserProfile(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 3,
  });
};

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
