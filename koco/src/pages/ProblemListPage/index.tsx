import PageHeader from '@/components/layout/PageHeader';
import Calendar from './components/Calendar';
import ProblemItem from './components/ProblemItem';
import { useProblemSet } from '@/hooks/queries/useProblemQueries';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';

const ProblemListPage = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateFromUrl = searchParams.get('date');

  // 초기 날짜 설정 - URL의 date 파라미터를 우선적으로 사용
  const [date, setDate] = useState(dateFromUrl || todayDate);

  const { data: problemListData, error, refetch } = useProblemSet(date);

  // URL의 date 파라미터가 변경되면 date 상태도 업데이트
  useEffect(() => {
    if (dateFromUrl && dateFromUrl !== date) {
      setDate(dateFromUrl);
    }
  }, [dateFromUrl]);

  const handleDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);

    navigate(`/problems?date=${encodeURIComponent(newDate)}`, { replace: true });

    // 날짜가 변경되면 명시적으로 데이터 다시 가져오기
    setTimeout(() => refetch(), 0);
  };

  if ((error as AxiosError)?.response?.status === 403) {
    return (
      <div className="bg-background min-h-screen">
        <PageHeader title="문제 해설" />
        <Calendar date={date} handleDate={handleDate} />
        <hr className="border-border" />
        <p className="text-center mt-12">해당 날짜의 문제가 존재하지 않습니다</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="문제 해설" />
      <Calendar date={date} handleDate={handleDate} />
      <hr className="border-border" />
      {problemListData?.problems && problemListData.problems.length > 0 ? (
        problemListData.problems.map(problem => (
          <ProblemItem
            key={problem.problemId}
            date={problemListData?.date}
            problemSetId={problemListData?.problemSetId}
            isAnswered={problemListData?.isAnswered}
            problemNumber={problem.problemNumber}
            title={problem.title}
            tier={problem.tier}
          />
        ))
      ) : (
        <p className="text-center mt-12">로딩 중이거나 문제가 없습니다</p>
      )}
    </div>
  );
};

export default ProblemListPage;
