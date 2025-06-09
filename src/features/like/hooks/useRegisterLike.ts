import { queryKeys } from '@/constants/queryKeys';
import { useMutation } from '@tanstack/react-query';
import registerLike from '../api/registerLike';

/**
 * 좋아요 등록 훅
 */
const useRegisterLike = (postId: number) => {
  return useMutation({
    mutationKey: queryKeys.post.like(postId),
    mutationFn: () => registerLike(postId),
  });
};

export default useRegisterLike;
