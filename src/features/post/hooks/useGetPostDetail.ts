import { queryKeys } from '@/constants/queryKeys';
import { useQuery } from '@tanstack/react-query';
import { getPostDetail } from '../api/getPostDetail';

/**
 * 게시글 상세 조회 훅
 * @param postId
 */
const useGetPostDetail = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.post.detail(postId),
    queryFn: () => getPostDetail(postId),
    staleTime: 0,
    gcTime: 1000 * 60 * 1,
    enabled: !!postId,
    refetchOnMount: true,
  });
};

export default useGetPostDetail;
