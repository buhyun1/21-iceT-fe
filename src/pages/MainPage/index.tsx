import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ProfileCard from './components/ProfileCard';
import TotalStudyCard from './components/TotalStudyCard';
import ChunsikCard from './components/ChunsikCard';

import { useUserProfile, useUserStats } from '@/hooks/queries/useUserQueries';
import { useProblemSet } from '@/hooks/queries/useProblemQueries';
import ProblemItem from './components/ProblemItem';
import Spinner from '@/components/ui/Spinner';
import { useAuth } from '@/context/AuthContext';

const MainPage = () => {
  const { logoutUserContext } = useAuth();
  const { data: userProfileData, isLoading: isUserProfileLoading } = useUserProfile();

  const { data: userStudyStatData, isLoading: isUserStudyStatLoading } = useUserStats();

  const today = new Date().toISOString().split('T')[0];
  const { data: todayProblemData, isLoading: isTodayProblemLoading } = useProblemSet(today);

  // ⏳ 로딩 중
  if (isUserProfileLoading || isUserStudyStatLoading || isTodayProblemLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Spinner text="로딩중..." />
      </div>
    );
  }

  if (!userProfileData) {
    logoutUserContext();

    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">프로필 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  if (!userStudyStatData) {
    logoutUserContext();

    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">알고리즘 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-30">
      <Header />

      <ProfileCard
        profileImgUrl={userProfileData.profileImgUrl}
        nickname={userProfileData.nickname}
        statusMessage={userProfileData.statusMessage}
      />

      {/* ✅ 오늘의 문제 */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">오늘의 문제</h2>
        {Array.isArray(todayProblemData?.problems) && todayProblemData.problems.length > 0 ? (
          todayProblemData.problems.map(problem => (
            <ProblemItem
              key={problem.problemNumber}
              problemNumber={problem.problemNumber}
              title={problem.title}
              tier={problem.tier}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">오늘 출제된 문제가 없습니다.</p>
        )}
      </div>

      <TotalStudyCard studyStats={userStudyStatData.studyStats} />
      <ChunsikCard />
      <BottomNav />
    </div>
  );
};

export default MainPage;
