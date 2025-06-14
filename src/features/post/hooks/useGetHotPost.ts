import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import getHotPosts from '../api/getHotPosts';

const useGetHotPost = () => {
  return useQuery({
    queryKey: queryKeys.post.hot,
    queryFn: () => getHotPosts(),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 3,
  });
};

export default useGetHotPost;
