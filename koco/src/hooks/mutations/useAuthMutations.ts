// src/hooks/mutations/useAuthMutations.ts
import { useMutation } from '@tanstack/react-query';
import { loginWithKakao, logout } from '@/apis/authApi';
import { useNavigate } from 'react-router-dom';

/**
 * 카카오 로그인 뮤테이션 훅
 */
export const useKakaoLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => loginWithKakao(code),
    onSuccess: response => {
      if (response.registered === false) {
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

  return useMutation({
    mutationFn: logout,
    onSuccess: data => {
      // 로그아웃 성공 시 로컬 스토리지 인증 상태 제거
      localStorage.removeItem('koco_auth_status');

      // 로그인 페이지로 리다이렉트
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        navigate('/');
      }
    },
    onError: () => {
      // 로그아웃 실패해도 로컬 상태는 초기화
      localStorage.removeItem('koco_auth_status');
      navigate('/');
    },
  });
};
