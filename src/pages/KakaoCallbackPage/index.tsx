// src/pages/KakaoCallback/index.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useKakaoLogin } from '@/hooks/mutations/useAuthMutations';
import Spinner from '@/components/ui/Spinner';

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
  return <Spinner text="로그인 처리중..." />;
};

export default KakaoCallback;
