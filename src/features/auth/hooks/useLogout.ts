import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/logout';
import { useAuthStore } from '@/store/useUserStore';

/**
 * 로그아웃 뮤테이션 훅
 */
export const useLogout = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      logoutUser();
      navigate('/');
    },
    onError: () => {
      alert('로그아웃에 실패하였습니다.');
    },
  });
};
