import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import getCommentList from '../api/getCommentList';

const useGetCommentList = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.post.comment(postId),
    queryFn: () => getCommentList(postId),
    staleTime: 0,
    gcTime: 1000 * 60,
    refetchOnMount: true,
  });
};

export default useGetCommentList;
