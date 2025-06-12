import PostForm, { IPostFormData } from '@/features/post/components/PostForm';
import { useCreatePost } from '@/features/post/hooks/useCreatePost';
import PageHeader from '@/shared/layout/PageHeader';
import { convertKoreanToEnglish } from '@/utils/doMappingCategories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePostPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const createPostMutation = useCreatePost();
  const navigate = useNavigate();

  const handleCreatePost = (data: IPostFormData) => {
    try {
      setIsLoading(true);

      createPostMutation.mutateAsync(
        {
          problemNumber: data.post.problemNumber,
          title: data.post.title,
          content: data.post.content,
          category: data.post.category && convertKoreanToEnglish(data.post.category),
        },
        {
          onSuccess: response => {
            // response에서 postId 추출하여 해당 게시글 상세 페이지로 이동
            if (response?.postId) {
              navigate(`/post/${response.postId}`);
            } else {
              navigate('/posts');
            }
          },
          onError: (error: any) => {
            if (error.response?.data?.code === 'BAD_REQUEST') {
              const message = error.response.data.message;
              alert(message);
            } else {
              alert('게시글 등록에 실패했습니다.');
            }
          },
        }
      );
    } catch {
      alert('게시글 등록에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="게시글 작성" />
      <PostForm onSubmit={handleCreatePost} submitButtonText="등록하기" isLoading={isLoading} />
    </div>
  );
};
/* <div className="p-4">
        <div className="flex space-y-2 gap-4 items-center">
          <label className="text-sm font-medium text-text-primary">문제 번호</label>
          <Input value={problemNumber} onChange={problemNumberOnChange} className="w-[100px]" />
        </div>
        <AlgorithmDropdown
          selectedTypes={selectedAlgorithmTypes}
          onToggleType={handleToggleAlgorithmType}
          onClearAll={handleClearAllTypes}
        />
        <div className="mt-4">
          <label className="mt-2">제목</label>
          <Input value={title} onChange={titleOnChange} className="w-full" />
        </div>
        <div className="mt-4">
          <label>내용</label>
          <MDEditor
            value={content}
            onChange={(value: string | undefined) => setContent(value || '')}
            height={600}
          />
        </div>
        <div className="mt-6 text-center">
          <Button onClick={handleCreatePost} disabled={isDisabled}>
            {buttonText}{' '}
          </Button>
        </div>
      </div> */

export default CreatePostPage;
