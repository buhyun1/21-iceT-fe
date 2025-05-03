// src/pages/KakaoCallback/index.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useKakaoLogin } from '@/hooks/mutations/useAuthMutations';

const KakaoCallback = () => {
  const location = useLocation();
  const { mutate, isSuccess, isError } = useKakaoLogin();

  useEffect(() => {
    // URL에서 인가 코드 추출
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    //const navigate = useNavigate();

    if (code && !isSuccess && !isError) {
      mutate(code);
    }
  }, [location, mutate]);

  // 로딩 UI
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-xl mb-4">로그인 처리 중...</div>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
    </div>
  );
};

export default KakaoCallback;
