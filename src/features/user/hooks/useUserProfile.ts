import { getUserProfile } from '../api/getUserProfile';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';

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
