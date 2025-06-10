import PostContent from '@/features/post/components/PostContent';
import PostMeta from '@/features/post/components/PostMeta';
import useGetPostDetail from '@/features/post/hooks/useGetPostDetail';
import BottomNav from '@/shared/layout/BottomNav';
import PageHeader from '@/shared/layout/PageHeader';
import { useParams } from 'react-router-dom';

const PostDetailPage = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : undefined;
  const { data: postDetailData, isLoading, isError } = useGetPostDetail(numericId as number);

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
        <article>
          <PostMeta
            categories={postDetailData.categories}
            title={postDetailData.title}
            author={postDetailData.author}
            createdAt={postDetailData.createdAt}
          />
          <PostContent content={postDetailData.content} />
        </article>
      </main>
    </div>
  );
};

export default PostDetailPage;
