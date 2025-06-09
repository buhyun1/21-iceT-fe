import { useMutation } from '@tanstack/react-query';
import deleteLike from '../api/deleteLike';

/**
 * 좋아요 삭제
 * @param postId
 */
const useDeleteLike = (postId: number) => {
  return useMutation({
    mutationFn: () => deleteLike(postId),
  });
};

export default useDeleteLike;
