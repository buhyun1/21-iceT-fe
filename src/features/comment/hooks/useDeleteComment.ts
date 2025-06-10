import { useMutation } from '@tanstack/react-query';
import deleteComment, { IDeleteCommentProps } from '../api/deleteComment';

const useDeleteComment = () => {
  return useMutation({
    mutationFn: (data: IDeleteCommentProps) => deleteComment(data),
  });
};

export default useDeleteComment;
