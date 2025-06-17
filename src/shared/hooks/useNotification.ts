import { useEffect } from 'react';
import { useAuth } from '@/app/providers/AuthContext';
import { useNotificationStore } from '@/stores/useAlarmStore';

/**
 * 알림 시스템을 초기화하고 관리하는 훅
 */
export const useNotification = () => {
  const { isAuthenticated } = useAuth();
  const { connect, disconnect, isConnected, hasUnreadNotifications, markAsRead } =
    useNotificationStore();

  useEffect(() => {
    // 로그인된 경우에만 연결
    if (isAuthenticated) {
      connect();
    } else {
      disconnect();
    }

    // 페이지 숨김/표시 시 연결 관리
    const handleVisibilityChange = () => {
      if (document.hidden) {
        disconnect();
      } else if (isAuthenticated) {
        connect();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 정리
    return () => {
      disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isAuthenticated, connect, disconnect]);

  return {
    isConnected,
    hasUnreadNotifications,
    markAsRead,
  };
};
