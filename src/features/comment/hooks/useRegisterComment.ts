import { useMutation } from '@tanstack/react-query';
import registerComment, { IRegisterCommentProps } from '../api/registerComment';

const useRegisterComment = () => {
  return useMutation({
    mutationFn: (data: IRegisterCommentProps) => registerComment(data),
  });
};

export default useRegisterComment;
