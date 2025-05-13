// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeProfile, deleteUser } from '@/apis/userApi';

/**
 * 사용자 프로필 완성 뮤테이션 훅
 */
export const useCompleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => completeProfile(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['complete-profile'] });
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
