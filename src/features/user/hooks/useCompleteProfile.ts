// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeProfile } from '../api/completeProfile';
import { queryKeys } from '@/constants/queryKeys';

export interface ICompleteUserProfileRequest {
  nickname: string;
  profileImgUrl: string;
  statusMsg: string;
}

/**
 * 사용자 프로필 완성 뮤테이션 훅
 */
export const useCompleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICompleteUserProfileRequest) => completeProfile(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile, type: 'all' });
    },
  });
};
