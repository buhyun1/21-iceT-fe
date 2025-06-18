import LoginCard from '@/features/auth/components/LoginCard';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuthStatus } = useAuthStore();

  useEffect(() => {
    // 페이지 로드 시 인증 상태 확인
    checkAuthStatus();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      // 이미 로그인된 상태라면 홈으로 리디렉션
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
