import BottomNav from '@/components/layout/BottomNav';
import ProfileCard from './components/ProfileCard';
import TotalStudyCard from './components/TotalStudyCard';
import Header from '@/components/layout/Header';
import { useUserDashboard } from '@/hooks/queries/useUserQueries';
import ChunsikCard from './components/ChunsikCard';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

const MainPage = () => {
  const todayDate = new Date().toISOString().split('T')[0];
  const { data: dashboardData, isLoading } = useUserDashboard(todayDate);
  const {
    data: userProfileData,
    error: profileError,
    isLoading: isUserProfileLoading,
  } = useUserProfile();
  const { data: userStudyStatData, isLoading: isUserStudyStatLoading } = useUserStats();

  //인증 에러 발생 시 로그인 페이지로 리디렉션

  useEffect(() => {
    if ((profileError as AxiosError)?.response?.status === 403) {
      console.log((profileError as AxiosError)?.response?.status);

      if ((profileError as AxiosError)?.response?.status === 403) {
        console.log('403 에러 발생, 로그인 페이지로 이동합니다');
        // 로컬 스토리지의 인증 플래그 제거
        localStorage.removeItem('koco_auth_flag');

        //로그인 페이지로 리디렉션
        window.location.href = '/';
      }
    }
  }, [profileError]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">로딩 중...</p>
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
      <TotalStudyCard studyStats={userStudyStatData.studyStats} />
      <ChunsikCard />
      <BottomNav />
    </div>
  );
};

export default MainPage;
