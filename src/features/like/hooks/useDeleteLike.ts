import { useMutation } from '@tanstack/react-query';
import deleteLike from '../api/deleteLike';

/**
 * 좋아요 삭제
 * @param postId
 */
const useDeleteLike = () => {
  return useMutation({
    mutationFn: (postId: number) => deleteLike(postId),
  });
};

export default useDeleteLike;
