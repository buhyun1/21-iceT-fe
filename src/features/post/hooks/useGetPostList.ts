import { useInfiniteQuery } from '@tanstack/react-query';
import getPostList from '../api/getPostList';

const useGetPostList = ({ category, keyword }: { category: string[]; keyword: string }) => {
  return useInfiniteQuery({
    queryKey: ['posts', category, keyword],
    queryFn: ({ pageParam }) => getPostList({ pageParam, category, keyword }),
    initialPageParam: null as number | null,
    getNextPageParam: lastPage => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });
};

export default useGetPostList;
