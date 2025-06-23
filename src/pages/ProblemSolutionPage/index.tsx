import BottomNav from '@/shared/layout/BottomNav';
import PageHeader from '@/shared/layout/PageHeader';
import ProblemDetailSection from './components/ProblemDetailSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import { useProblemSolution } from '@/features/problemSet/hooks/useProblemSolution';
import { useParams } from 'react-router-dom';

const ProblemSolutionPage = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : undefined;
  const { data: solutionData, isLoading, isError } = useProblemSolution(numericId as number);

  // 로딩 중이거나 데이터가 없는 경우 로딩 표시
  if (isLoading) {
    return (
      <div>
        <PageHeader title="문제 해설" />
        <div className="flex justify-center items-center h-[60vh]">
          <p>로딩 중...</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  if (isError || !solutionData) {
    return (
      <div>
        <PageHeader title="문제 해설" />
        <div className="flex justify-center items-center h-[60vh]">
          <p>해설 정보가 없습니다</p>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="문제 해설" />
      <div className="shadow-md">
        <ProblemDetailSection {...solutionData} />
        <ProblemSolutionSection
          problemCheck={solutionData.problemCheck}
          algorithm={solutionData.algorithm}
          problemSolving={solutionData.problemSolving}
          solutionCode={solutionData.solutionCode}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default ProblemSolutionPage;
