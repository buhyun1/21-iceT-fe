import { useAuth } from '@/app/providers/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/logout';

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
