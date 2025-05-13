import BottomNav from '@/components/layout/BottomNav';
import ProfileCard from './components/ProfileCard';
import Header from '@/components/layout/Header';
import { useUserProfile, useUserStats } from '@/hooks/queries/useUserQueries';
import ChunsikCard from './components/ChunsikCard';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import TotalStudyCard from './components/TotalStudyCard';

const MainPage = () => {
  const {
    data: userProfileData,
    error: profileError,
    isLoading: isUserProfileLoading,
  } = useUserProfile();
  const { data: userStudyStatData, isLoading: isUserStudyStatLoading } = useUserStats();

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
  //인증 에러 발생 시 로그인 페이지로 리디렉션
  // useEffect(() => {
  //   if (error || (!isLoading && !dashboardData)) {
  //     console.error('데이터 불러오기 실패:', error);

  //     console.log((error as AxiosError)?.response?.status);

  //     if ((error as AxiosError)?.response?.status === 403) {
  //       console.log('403 에러 발생, 로그인 페이지로 이동합니다');
  //       // 로컬 스토리지의 인증 플래그 제거
  //       localStorage.removeItem('koco_auth_flag');

  //       //로그인 페이지로 리디렉션
  //       window.location.href = '/';
  //     }
  //   }
  // }, [error, dashboardData, isLoading]);

  if (isUserProfileLoading || isUserStudyStatLoading) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">로딩 중...</p>
      </div>
    );
  }

  if (!userProfileData || !userStudyStatData) {
    return (
      <div className="flex flex-col gap-6 p-6 pb-30">
        <Header />
        <p className="text-center">데이터를 불러올 수 없습니다. 다시 로그인해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6 pb-30">
      <Header />
      <ProfileCard
        profileImgUrl={userProfileData.profileImageUrl}
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
