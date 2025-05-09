import { useEffect, useState } from 'react';
import QuestionCard from './components/QuestionCard';
import Button from '@/components/ui/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useRegisterSurvey } from '@/hooks/mutations/useProblemMutations';
import { IProblemSurveyRequest } from '@/@types/problem';
import { useProblemSet } from '@/hooks/queries/useProblemQueries';

interface ISurveyData {
  problemId: number;
  isSolved: boolean | null;
  difficultyLevel: string;
}

type Problem = {
  problemId: number;
  title: string;
  tier: string;
};

export interface IProblemSetResponse {
  date: string;
  problemSetId: number;
  isAnswered: boolean;
  problems: Problem[];
}

const SurveyPage = () => {
  const location = useLocation();
  const problemSetId = Number(location.state?.problemSetId);

  const navigate = useNavigate();
  const [surveyData, setSurveyData] = useState<ISurveyData[]>([]);
  const registerSurveyMutation = useRegisterSurvey();

  const todayDate = new Date().toISOString().split('T')[0];
  const { data: problemListData } = useProblemSet(todayDate);

  const allAnswered = surveyData.every(
    item => item.isSolved !== null && item.difficultyLevel !== ''
  );

  const handleQuestionChange = (
    problemId: number,
    data: { isSolved?: boolean; difficultyLevel?: string }
  ) => {
    setSurveyData(prev =>
      prev.map(item => (item.problemId === problemId ? { ...item, ...data } : item))
    );
  };

  const handleSubmitSurvey = () => {
    const requestData: IProblemSurveyRequest = {
      problemSetId: problemSetId,
      responses: surveyData.map((item, index) => ({
        problemId: item.problemId,
        problemNumber: index + 1,
        isSolved: item.isSolved === null ? false : item.isSolved,
        difficultyLevel:
          item.difficultyLevel === '쉬웠어요'
            ? 'EASY'
            : item.difficultyLevel === '어려웠어요'
              ? 'HARD'
              : 'MEDIUM', // Default value if empty
      })),
    };

    registerSurveyMutation.mutate(requestData, {
      onSuccess: () => {
        navigate('/problems');
      },
      onError: () => {
        console.log(requestData);
        navigate('/problems');
      },
    });
  };

  useEffect(() => {
    if (problemListData?.problems) {
      const initialSurveyData = problemListData.problems.map((problem: Problem) => ({
        problemId: problem.problemId,
        isSolved: null,
        difficultyLevel: '',
      }));
      setSurveyData(initialSurveyData);
    }
  }, [problemListData?.problems]);

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="설문" />
      {problemListData?.problems.map((problem: Problem) => (
        <QuestionCard
          key={problem.problemId}
          problemId={problem.problemId}
          title={problem.title}
          onChange={handleQuestionChange}
          solvedState={surveyData.find(d => d.problemId === problem.problemId)?.isSolved ?? null}
          difficultyState={
            surveyData.find(d => d.problemId === problem.problemId)?.difficultyLevel ?? ''
          }
        />
      ))}
      {problemListData?.problems?.length > 0 && (
        <Button className="mt-6 w-full" disabled={!allAnswered} onClick={handleSubmitSurvey}>
          오늘의 해설집 확인하기
        </Button>
      )}
      {!(problemListData?.problems?.length > 0) && (
        <div className="flex flex-col items-center justify-center p-10">
          <p>오늘의 문제가 존재하지 않습니다</p>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;
