import { useMutation } from '@tanstack/react-query';
import editPost, { IEditPostProps } from '../api/editPost';

const useEditPost = () => {
  return useMutation({
    mutationFn: (data: IEditPostProps) => editPost(data),
  });
};

export default useEditPost;
