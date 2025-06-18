import { User } from '@/features/user/types/user';
import { create } from 'zustand';

interface IUserStore {
  user: User | null;
  setUser: (data: User) => void;
  deleteUser: () => void;
}

export const useUserStore = create<IUserStore>(set => ({
  user: null,
  setUser: (data: User) => {
    set({ user: data });
  },
  deleteUser: () => {
    set({ user: null });
  },
}));
