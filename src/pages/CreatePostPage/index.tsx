import { useCreatePost } from '@/features/post/hooks/useCreatePost';
import useAlgorithmDropdown from '@/shared/hooks/useAlgorithmDropdown';
import useInput from '@/shared/hooks/useInput';
import useSubmitButton from '@/shared/hooks/useSubmitButton';
import PageHeader from '@/shared/layout/PageHeader';
import AlgorithmDropdown from '@/shared/ui/AlgorithmDropdown';
import Button from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import { convertKoreanToEnglish } from '@/utils/doMappingCategories';
import { useMemo, useState } from 'react';

const CreatePostPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { value: title, onChange: titleOnChange } = useInput();
  const { value: problemNumber, onChange: problemNumberOnChange } = useInput();
  const { selectedAlgorithmTypes, handleToggleAlgorithmType, handleClearAllTypes } =
    useAlgorithmDropdown();
  const createPostMutation = useCreatePost();

  // 문제 번호 유효성 검사
  const problemNumberErr = useMemo(() => {
    if (!problemNumber) return '문제 번호를 입력해주세요.';
    if (problemNumber.length < 1 || problemNumber.length > 6) {
      return '문제 번호는 1-6자리 숫자여야 합니다.';
    }
    if (!/^\d+$/.test(problemNumber)) {
      return '숫자만 입력 가능합니다.';
    }

    return null;
  }, [problemNumber]);

  const titleErr = useMemo(() => {
    if (!title) return '제목을 입력해주세요';
    if (title.length < 1 || title.length > 30) {
      return '제목은 1-30자까지 입력 가능합니다.';
    }

    return null;
  }, [title]);
  const submitErr = problemNumberErr || titleErr;

  const { isDisabled, buttonText } = useSubmitButton({ submitErr, isLoading });

  const handleCreatePost = () => {
    if (submitErr) return;

    try {
      setIsLoading(true);
      const category = convertKoreanToEnglish(selectedAlgorithmTypes);
      createPostMutation.mutateAsync({
        problemNumber: Number(problemNumber),
        title,
        content: 'ㅎㅎ',
        category: category,
      });
    } catch {
      alert('게시글 등록에 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen relative">
      <PageHeader title="게시글 작성" />
      <div className="p-4">
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
        </div>
        <div className="mt-6 text-center">
          <Button onClick={handleCreatePost} disabled={isDisabled}>
            {buttonText}{' '}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
