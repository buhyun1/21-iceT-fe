import { useEffect, useState } from 'react';
import QuestionCard from '../../features/survey/components/QuestionCard';
import Button from '@/shared/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '@/shared/layout/PageHeader';
import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/constants/queryKeys';
import { useRegisterSurvey } from '@/features/survey/hooks/useRegisterSurvey';
import { useProblemSet } from '@/features/problemSet/hooks/useProblemSet';
import { IProblemSurveyRequest } from '@/features/survey/api/registerSurvey';
import useSubmitButton from '@/shared/hooks/useSubmitButton';
import { Problem } from '@/features/problemSet/types/problem';
interface ISurveyData {
  problemId: number;
  isSolved: boolean | null;
  difficultyLevel: string;
}

export interface IProblemSetResponse {
  date: string;
  problemSetId: number;
  isAnswered: boolean;
  problems: Problem[];
}

const difficultyLevelMap: Record<string, 'EASY' | 'MEDIUM' | 'HARD'> = {
  쉬웠어요: 'EASY',
  적당했어요: 'MEDIUM',
  어려웠어요: 'HARD',
};

const SurveyPage = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();

  const targetDate = location.state?.date;
  const [surveyData, setSurveyData] = useState<ISurveyData[]>([]);

  const registerSurveyMutation = useRegisterSurvey();
  const { data: problemListData, error } = useProblemSet(targetDate);

  const allAnswered = surveyData.every(
    item => item.isSolved !== null && item.difficultyLevel !== ''
  );
  const isLoading = registerSurveyMutation.isPending;
  const submitErr = !allAnswered ? '모든 설문을 완료해주세요.' : null;
  const { isDisabled, buttonText } = useSubmitButton({
    submitErr,
    isLoading,
    submitText: '오늘의 해설집 확인하기',
    loadingText: '제출 중...',
  });

  // 설문 데이터를 저장합니다
  const handleQuestionChange = (
    problemId: number,
    data: { isSolved?: boolean; difficultyLevel?: string }
  ) => {
    setSurveyData(prev =>
      prev.map(item => (item.problemId === problemId ? { ...item, ...data } : item))
    );
  };

  // api를 호출해 설문 데이터를 전송합니다
  const handleSubmitSurvey = () => {
    if (!problemListData?.problemSetId) {
      return;
    }

    const requestData: IProblemSurveyRequest = {
      problemSetId: problemListData.problemSetId,
      responses: surveyData.map(item => ({
        problemId: item.problemId,
        isSolved: item.isSolved!,
        difficultyLevel: difficultyLevelMap[item.difficultyLevel],
      })),
    };

    registerSurveyMutation.mutate(requestData, {
      onSuccess: async () => {
        // 설문 등록 성공 시 문제 리스트 조회 페이지 이동

        await queryClient.invalidateQueries({
          queryKey: queryKeys.problems.set(targetDate),
          type: 'all',
        });
        await queryClient.invalidateQueries({
          queryKey: queryKeys.users.stats,
          type: 'all',
        });
        navigate(`/problems?date=${encodeURIComponent(targetDate)}`);
      },
      onError: async () => {
        alert('설문 등록에 실패하였습니다');
        await queryClient.invalidateQueries({
          queryKey: queryKeys.problems.set(targetDate),
        });
        navigate(`/problems?date=${encodeURIComponent(targetDate)}`);
      },
    });
  };

  useEffect(() => {
    if (problemListData?.problems) {
      if (problemListData?.isAnswered) {
        alert('이미 완료한 설문입니다');
        navigate('/');

        return;
      }
      const initialSurveyData = problemListData.problems.map((problem: Problem) => ({
        problemId: problem.problemId,
        isSolved: null,
        difficultyLevel: '',
      }));
      setSurveyData(initialSurveyData);
    }
  }, [problemListData?.problems]);

  if ((error as AxiosError)?.response?.status === 403) {
    return (
      <div className="bg-background min-h-screen">
        <PageHeader title="설문" />
        <div className="flex flex-col items-center justify-center p-12">
          <p>오늘의 문제가 존재하지 않습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="설문" />
      {problemListData?.problems.map((problem: Problem) => (
        <QuestionCard
          key={problem.problemId}
          problemId={problem.problemId}
          problemNumber={problem.problemNumber}
          title={problem.title}
          onChange={handleQuestionChange}
          solvedState={surveyData.find(d => d.problemId === problem.problemId)?.isSolved ?? null}
          difficultyState={
            surveyData.find(d => d.problemId === problem.problemId)?.difficultyLevel ?? ''
          }
        />
      ))}
      {problemListData && problemListData.problems.length > 0 && (
        <Button className="mt-6 w-full" disabled={isDisabled} onClick={handleSubmitSurvey}>
          {buttonText}
        </Button>
      )}
      {problemListData && !problemListData.problems && (
        <div className="flex flex-col items-center justify-center p-10">
          <p>오늘의 문제가 존재하지 않습니다</p>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
