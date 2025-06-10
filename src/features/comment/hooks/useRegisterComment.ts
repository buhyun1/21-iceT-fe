import { useMutation } from '@tanstack/react-query';
import registerComment from '../api/registerComment';

const useRegisterComment = () => {
  return useMutation({
    mutationFn: (postId: number) => registerComment(postId),
  });
};

export default useRegisterComment;
