// src/hooks/mutations/useAuthMutations.ts
import { useMutation } from '@tanstack/react-query';
import { loginWithKakao, logout } from '@/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * 카카오 로그인 뮤테이션 훅
 */
export const useKakaoLogin = () => {
  const navigate = useNavigate();
  const { loginUserContext } = useAuth();

  return useMutation({
    mutationFn: (code: string) => loginWithKakao(code),
    onSuccess: response => {
      loginUserContext();
      if (response.isRegistered === false) {
        navigate('/complete-profile');
      } else {
        navigate('/home');
      }
    },
  });
};

/**
 * 로그아웃 뮤테이션 훅
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const { logoutUserContext } = useAuth();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutUserContext();
      navigate('/');
    },
    onError: () => {
      alert('로그아웃에 실패하였습니다.');
    },
  });
};
