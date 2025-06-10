import { useMutation } from '@tanstack/react-query';
import registerLike from '../api/registerLike';

/**
 * 좋아요 등록 훅
 */
const useRegisterLike = () => {
  return useMutation({
    mutationFn: (postId: number) => registerLike(postId),
  });
};

export default useRegisterLike;
