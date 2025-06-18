// src/hooks/mutations/useAuthMutations.ts
import { useMutation } from '@tanstack/react-query';
import { loginWithKakao } from '../api/loginWithKakao';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * 카카오 로그인 뮤테이션 훅
 */
export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuthStore();

  return useMutation({
    mutationFn: (code: string) => loginWithKakao(code),
    onSuccess: response => {
      loginUser();
      if (response.isRegistered === false) {
        navigate('/complete-profile');
      } else {
        navigate('/home');
      }
    },
  });
};
