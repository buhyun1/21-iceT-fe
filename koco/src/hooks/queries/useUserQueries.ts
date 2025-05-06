import { getUserDashboard } from '@/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
//import MOCK_DASHBOARD_DATA from '@/temp/mock/dashboard';

/**
 * 사용자 대시보드 데이터를 가져오는 React Query 훅
 * @param date 조회할 날짜 (YYYY-MM-DD 형식)
 */
export const useUserDashboard = (date: string) => {
  return useQuery({
    queryKey: queryKeys.users.dashboard(date),
    //initialData: MOCK_DASHBOARD_DATA,
    queryFn: () => getUserDashboard(date),
    enabled: !!date, // date가 유효할 때만 쿼리 활성화
    staleTime: 1000 * 60 * 5,
  });
};
