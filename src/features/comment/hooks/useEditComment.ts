import { useMutation } from '@tanstack/react-query';
import editComment, { IEditCommentProps } from '../api/editComment';

const useEditComment = () => {
  return useMutation({
    mutationFn: (data: IEditCommentProps) => editComment(data),
  });
};

export default useEditComment;
