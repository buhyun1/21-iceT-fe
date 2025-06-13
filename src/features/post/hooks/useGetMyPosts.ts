import { queryKeys } from '@/constants/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import getMyPosts from '../api/getMyPosts';

const useGetMyPosts = () => {
  return useInfiniteQuery({
    queryKey: queryKeys.post.my,
    queryFn: ({ pageParam }) => getMyPosts(pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });
};

export default useGetMyPosts;
