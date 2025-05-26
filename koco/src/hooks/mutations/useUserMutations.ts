// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeProfile, deleteUser } from '@/apis/userApi';
import { ICompleteUserProfileRequest } from '@/@types/user';
import { queryKeys } from '../queries/queryKeys';

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

/**
 * 회원 탈퇴 뮤테이션 훅
 */
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // 성공 시 모든 사용자 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['delete-user'] });
    },
  });
};
