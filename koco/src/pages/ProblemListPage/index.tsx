import PageHeader from '@/components/layout/PageHeader';
import Calendar from './components/Calendar';
import ProblemItem from './components/ProblemItem';
import { useProblemSet } from '@/hooks/queries/useProblemQueries';
import { useState } from 'react';

const ProblemListPage = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayDate);

  const { data: problemListData } = useProblemSet(date);

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="문제 해설" />
      <Calendar date={date} handleDate={handleDate} />
      <hr className="border-border" />
      {problemListData?.problems.map(problem => (
        <ProblemItem
          key={problem.problemId}
          problemSetId={problemListData?.problemSetId}
          isAnswered={problemListData?.isAnswered}
          problemNumber={problem.problemNumber}
          title={problem.title}
          tier={problem.tier}
        />
      ))}
    </div>
  );
};

export default ProblemListPage;
