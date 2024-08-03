import { create } from 'zustand';
import type { Response } from '@/_apis/type';

interface UserState {
  isLoggedIn: boolean;
  logout: () => void;
  setLoginStatus: (status: boolean, response?: Response) => void;
  user: Response | null;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  logout: () => set({ isLoggedIn: false, user: null }),
  setLoginStatus: (status, response) => set({ isLoggedIn: status, user: response || null }),
  user: null,
}));

export default useUserStore;
