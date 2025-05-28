// src/components/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

import Spinner from '@/shared/ui/Spinner';
import { useAuth } from '../providers/AuthContext';

export const AuthProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Spinner text="로그인 시도 중..." />;
  }

  // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
