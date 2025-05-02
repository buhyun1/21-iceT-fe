import BottomNav from '@/components/layout/BottomNav';
import PageHeader from '@/components/layout/PageHeader';
import ProblemDetailSection from './components/ProblemDetailSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import { useProblemSolution } from '@/hooks/queries/useProblemQueries';
import { useParams } from 'react-router-dom';

const ProblemSolutionPage = () => {
  const { id } = useParams();
  const numericId = id ? parseInt(id, 10) : undefined;
  const { data: solutionData } = useProblemSolution(numericId as number);

  return (
    <div>
      <PageHeader title="문제 해설" />
      <div className=" shadow-md">
        <ProblemDetailSection {...solutionData} />
        <ProblemSolutionSection
          explanation={solutionData.problemCheck}
          solutionCode={solutionData.solutionCode}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default ProblemSolutionPage;
