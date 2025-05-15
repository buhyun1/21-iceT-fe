// src/components/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Spinner from '@/components/ui/Spinner';

export const ProtectedRoute = () => {
  const { isAuthenticated, loading, profileCompleted } = useAuth();
  const location = useLocation();
  const isCompletingProfile = location.pathname === '/complete-profile';

  if (loading) {
    return <Spinner text="로그인 시도 중..." />;
  }

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // 로그인은 됐지만 프로필이 완성되지 않았고, 현재 complete-profile 페이지가 아닌 경우
  // complete-profile 페이지로 리다이렉트
  if (!isCompletingProfile && !profileCompleted) {
    return <Navigate to="/complete-profile" />;
  }

  return <Outlet />;
};
