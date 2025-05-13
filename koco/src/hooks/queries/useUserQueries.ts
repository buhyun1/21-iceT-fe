import { getUserProfile, getUserStudyStats } from '@/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

/**
 * 기존 훅 (현재 사용 x)
 * 사용자 대시보드 데이터를 가져오는 React Query 훅
 * @param date 조회할 날짜 (YYYY-MM-DD 형식)
 */
// export const useUserDashboard = (date: string) => {
//   return useQuery({
//     queryKey: queryKeys.users.dashboard(date),
//     //initialData: MOCK_DASHBOARD_DATA,
//     queryFn: () => getUserDashboard(date),
//     enabled: !!date, // date가 유효할 때만 쿼리 활성화
//     staleTime: 1000 * 60 * 5,
//   });
// };

/**
 * 사용자 프로필 정보 조회
 */
export const useUserProfile = () => {
  return useQuery({
    queryKey: queryKeys.users.profile,
    //initialData: MOCK_DASHBOARD_DATA,
    queryFn: () => getUserProfile(),
    staleTime: 1000 * 60 * 5,
  });
};

/**
 * 사용자 알고리즘 스탯 조회
 */
export const useUserStats = () => {
  return useQuery({
    queryKey: queryKeys.users.stats,
    queryFn: () => getUserStudyStats(),
    staleTime: 1000 * 60 * 5,
  });
};
