import { StudyStat } from '@/features/user/types/studystat';
import Card from '@/shared/ui/Card';
import Spinner from '@/shared/ui/Spinner';
import { lazy, Suspense } from 'react';

interface ITotalStudyCardProps {
  studyStats: StudyStat[];
}

const RadarChart = lazy(() => import('../../../../features/user/components/StudyStatsRadarChart'));

const TotalStudyCard = ({ studyStats }: ITotalStudyCardProps) => (
  <Card className="p-4 flex justify-between">
    <p className="text-text-primary text-md">나의 공부량</p>
    <div className="w-100 h-60 rounded-md flex items-center justify-center text-xs text-text-disabled">
      {studyStats.length > 0 ? (
        <Suspense fallback={<Spinner text="차트 로딩중" />}>
          <RadarChart studyStats={studyStats} />
        </Suspense>
      ) : (
        <p>풀이 기록이 없습니다</p>
      )}
    </div>
  </Card>
);

export default TotalStudyCard;
