import PostItem from '@/features/post/components/PostItem';
import useGetMyPosts from '@/features/post/hooks/useGetMyPosts';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import BottomNav from '@/shared/layout/BottomNav';
import PageHeader from '@/shared/layout/PageHeader';

const MyPostPage = () => {
  const {
    data: myPostListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isPostsLoading,
  } = useGetMyPosts();

  const lastCommentRef = useInfiniteScroll({
    isLoading: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const allPosts = myPostListData?.pages?.flatMap(page => page.posts) || [];

  return (
    <div className="bg-background min-h-screen relative pb-20">
      <PageHeader title="나의 게시글" />
      {allPosts.length > 0
        ? allPosts.map((post, index) => {
            if (allPosts.length === index + 1) {
              return (
                <div key={post.postId} ref={lastCommentRef}>
                  <PostItem post={post} />
                </div>
              );
            } else {
              return <PostItem key={post.postId} post={post} />;
            }
          })
        : !isPostsLoading && <p className="text-center py-8">게시글이 없습니다.</p>}

      {/* 첫 로딩 */}
      {isPostsLoading && allPosts.length === 0 && (
        <div className="py-8 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          <p className="mt-2 text-sm text-gray-500">게시글을 불러오는 중...</p>
        </div>
      )}

      {/* 추가 게시글 로딩 */}
      {isFetchingNextPage && (
        <div className="py-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          <p className="mt-2 text-sm text-gray-500">더 많은 게시글을 불러오는 중...</p>
        </div>
      )}
      <BottomNav />
    </div>
  );
};

export default MyPostPage;
