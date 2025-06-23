import { useAuth } from '@/app/providers/AuthContext';
import LoginCard from '@/features/auth/components/LoginCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
