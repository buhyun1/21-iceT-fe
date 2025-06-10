import { useMutation } from '@tanstack/react-query';
import deletePost, { IDeletePostProps } from '../api/deletePost';

const useDeletePost = () => {
  return useMutation({
    mutationFn: (data: IDeletePostProps) => deletePost(data),
  });
};

export default useDeletePost;
