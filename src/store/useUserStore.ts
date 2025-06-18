// src/stores/useAuthStore.ts
import { create } from 'zustand';

interface IAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  loginUser: () => void;
  logoutUser: () => void;
  checkAuthStatus: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<IAuthState>(set => ({
  isAuthenticated: false,
  isLoading: true,

  loginUser: () => {
    localStorage.setItem('koco_auth_flag', 'true');
    set({ isAuthenticated: true });
  },

  logoutUser: () => {
    localStorage.removeItem('koco_auth_flag');
    set({ isAuthenticated: false });
  },

  checkAuthStatus: () => {
    const authFlag = localStorage.getItem('koco_auth_flag');
    const isAuth = !!authFlag;
    set({
      isAuthenticated: isAuth,
      isLoading: false,
    });
    console.log(authFlag, isAuth);
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
