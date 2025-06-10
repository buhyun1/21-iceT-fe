import CommentInputBox from '@/features/comment/components/commentInputBox';
import CommentItem from '@/features/comment/components/commentItem';
import useGetCommentList from '@/features/comment/hooks/useGetCommentList';
import CommentCountBox from '@/features/post/components/CommentCountBox';
import LikeBoxWithActions from '@/features/post/components/LikeBoxWithActions';
import PostContent from '@/features/post/components/PostContent';
import PostMeta from '@/features/post/components/PostMeta';
import useGetPostDetail from '@/features/post/hooks/useGetPostDetail';
import { useUserProfile } from '@/features/user/hooks/useUserProfile';
import BottomNav from '@/shared/layout/BottomNav';
import PageHeader from '@/shared/layout/PageHeader';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : undefined;
  const { data: postDetailData, isLoading, isError } = useGetPostDetail(numericId as number);
  const { data: commentListData } = useGetCommentList(numericId as number);
  const { data: userProfileData } = useUserProfile();

  // 로딩 중이거나 데이터가 없는 경우 로딩 표시
  if (isLoading) {
    return (
      <div>
        <PageHeader title="게시글 상세" />
        <div className="flex justify-center items-center h-[60vh]">
          <p>로딩 중...</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (isError || !postDetailData) {
    return (
      <div>
        <PageHeader title="게시글 상세" />
        <div className="flex justify-center items-center h-[60vh]">
          <p>게시글 정보가 없습니다</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="게시글 상세" />
      <main className="px-6">
        <article className="border-b-[2px] border-border">
          <PostMeta
            postId={postDetailData.postId}
            categories={postDetailData.categories}
            title={postDetailData.title}
            author={postDetailData.author}
            createdAt={postDetailData.createdAt}
            isOwner={userProfileData?.userId === postDetailData.author.userId}
          />
          <PostContent content={postDetailData.content} />
          <div className=" flex gap-2 justify-end mt-4 mb-4">
            <LikeBoxWithActions
              postId={postDetailData.postId}
              liked={postDetailData.liked}
              likeCount={postDetailData.likeCount}
            />
            <CommentCountBox commentCount={postDetailData.commentCount} />
          </div>
        </article>
        <section>
          <CommentInputBox postId={postDetailData.postId} />
          {commentListData?.comments ? (
            commentListData.comments.map(comment => (
              <CommentItem
                postId={postDetailData.postId}
                commentId={comment.id}
                key={comment.id}
                content={comment.comment}
                author={comment.author}
                createdAt={comment.createdAt}
                isOwner={userProfileData?.userId === comment.author.userId}
              />
            ))
          ) : (
            <div className="py-8 text-center">댓글이 없습니다.</div>
          )}
        </section>
        <div />
      </main>
    </div>
  );
};

export default PostDetailPage;
