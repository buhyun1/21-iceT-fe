// stores/useNotificationStore.ts
import { create } from 'zustand';
import { API_BASE_URL, API_SUB_URLS_V3 } from '@/constants/apiConfig';

export type AlarmData = {
  id: number;
  postId: number;
  postTitle: string;
  receiverId: number;
  senderId: number;
  senderNickname: string;
  alarmType: 'COMMENT' | 'LIKE';
  createdAt: string;
};

export interface IToast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  icon: string;
  duration?: number;
}

interface IAlarmState {
  // 상태
  isConnected: boolean;
  eventSource: EventSource | null;
  hasUnreadNotifications: boolean;
  toasts: IToast[];

  // 액션
  connect: () => void;
  disconnect: () => void;
  handleMessage: (data: AlarmData) => void;
  markAsRead: () => void;
  addToast: (toast: Omit<IToast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useNotificationStore = create<IAlarmState>((set, get) => ({
  // 초기 상태
  isConnected: false,
  eventSource: null,
  hasUnreadNotifications: false,
  toasts: [],

  // SSE 연결
  connect: () => {
    const { eventSource: currentEventSource } = get();

    // 이미 연결되어 있으면 무시
    if (currentEventSource) {
      return;
    }

    try {
      const eventSource = new EventSource(`${API_BASE_URL}${API_SUB_URLS_V3}/alarms/subscribe`, {
        withCredentials: true,
      });

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        set({ isConnected: true });
      };

      // 특정 이벤트 타입 처리
      eventSource.addEventListener('alarm', event => {
        try {
          const data: AlarmData = JSON.parse(event.data);
          console.log('알림 수신:', data);
          get().handleMessage(data);
        } catch (error) {
          console.error('알림 파싱 오류:', error);
        }
      });

      eventSource.onerror = error => {
        console.error('SSE 오류:', error);
        set({ isConnected: false });

        // 자동 재연결 (3초 후)
        setTimeout(() => {
          get().disconnect();
          get().connect();
        }, 3000);
      };

      set({ eventSource, isConnected: true });
    } catch (error) {
      console.error('SSE 연결 생성 오류:', error);
    }
  },

  // 연결 해제
  disconnect: () => {
    const { eventSource } = get();

    if (eventSource) {
      eventSource.close();
      set({
        eventSource: null,
        isConnected: false,
      });
    }
  },

  handleMessage: () => {
    // 기존의 통합 알림 토스트가 있다면 제거
    const existingToasts = get().toasts;
    const summaryToast = existingToasts.find(
      t => t.message === '알림이 도착했습니다! 확인해주세요'
    );

    if (summaryToast) {
      get().removeToast(summaryToast.id);
    }

    // 항상 통합 알림 토스트만 표시
    get().addToast({
      message: '알림이 도착했습니다! 확인해주세요',
      type: 'info',
      icon: '🔔',
      duration: 4000,
    });

    // // 읽지 않은 알림 상태 업데이트
    set({ hasUnreadNotifications: true });
  },

  // 읽음 처리
  markAsRead: () => {
    set({
      hasUnreadNotifications: false,
    });
  },

  // 토스트 추가
  addToast: toast => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    // 자동 제거
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, toast.duration);
    }
  },

  // 토스트 제거
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
}));
