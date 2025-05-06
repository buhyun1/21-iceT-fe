import BottomNav from '@/components/layout/BottomNav';
import GameBannerCard from './components/GameBannerCard';
import ProfileCard from './components/ProfileCard';
import TotalStudyCard from './components/TotalStudyCard';
import Header from '@/components/layout/Header';
import { useUserDashboard } from '@/hooks/queries/useUserQueries';

const MainPage = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const { data: dashboardData, isLoading } = useUserDashboard(todayDate);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">로딩 중...</p>
      </div>
    );
  }
  if (!dashboardData) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">유저 데이터가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-30">
      <Header />
      <ProfileCard
        profileImgUrl={dashboardData.profileImgUrl}
        nickname={dashboardData.nickname}
        statusMessage={dashboardData.statusMessage}
        problemSetId={dashboardData.todayProblemSetId}
      />
      <TotalStudyCard studyStats={dashboardData.studyStats} />
      <GameBannerCard />
      <BottomNav />
    </div>
  );
};

export default MainPage;
