import PageHeader from '@/shared/layout/PageHeader';
import Calendar from '@/shared/ui/Calendar';
import { useProblemSet } from '@/features/problemSet/hooks/useProblemSet';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import BottomNav from '@/shared/layout/BottomNav';
import ProblemItem from '@/features/problemSet/components/ProblemItem';

const ProblemListPage = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateFromUrl = searchParams.get('date');

  // 초기 날짜 설정 - URL의 date 파라미터를 우선적으로 사용
  const [date, setDate] = useState(dateFromUrl || todayDate);
  const { data: problemListData, error } = useProblemSet(date);

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
  };

  if ((error as AxiosError)?.response?.status === 403) {
    return (
      <div className="bg-background min-h-screen">
        <PageHeader title="문제 해설" />
        <Calendar date={date} handleDate={handleDate} />
        <hr className="border-border" />
        <p className="text-center mt-12">해당 날짜의 문제가 존재하지 않습니다</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <PageHeader title="문제 해설" />
      <Calendar date={date} handleDate={handleDate} />
      <hr className="border-border" />
      {problemListData?.problems.map(problem => (
        <ProblemItem
          key={problem.problemId}
          title={problem.title}
          tier={problem.tier}
          problemNumber={problem.problemNumber}
          onClick={() => {
            if (problemListData?.isAnswered) {
              navigate(`/problems/${problem.problemNumber}`);
            } else {
              alert('설문이 기록되지 않았습니다. 설문페이지로 이동합니다');
              navigate('/survey', {
                state: { problemSetId: problemListData?.problemSetId, date: date },
              });
            }
          }}
        />
      ))}
      <BottomNav />
    </div>
  );
};

export default ProblemListPage;
