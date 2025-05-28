// src/hooks/mutations/useUserMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../api/deleteUser';
//import { queryKeys } from '@/constants/queryKeys';

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
