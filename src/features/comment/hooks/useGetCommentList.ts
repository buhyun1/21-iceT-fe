import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import getCommentList from '../api/getCommentList';

const useGetCommentList = (postId: number) => {
  return useInfiniteQuery({
    queryKey: queryKeys.post.comment(postId),
    queryFn: ({ pageParam }) => getCommentList({ pageParam, postId }),
    initialPageParam: null as number | null,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });
};

export default useGetCommentList;
