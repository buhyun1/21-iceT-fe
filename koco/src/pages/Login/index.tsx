import LoginCard from '@/pages/Login/components/LoginCard';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 인증 플래그 확인
    const authFlag = localStorage.getItem('koco_auth_flag');

    if (authFlag === 'true') {
      // 이미 로그인된 상태라면 홈으로 리디렉션
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <LoginCard />
    </div>
  );
};

export default LoginPage;
