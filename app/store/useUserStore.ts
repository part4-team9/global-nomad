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
  logout: () => {
    set({ isLoggedIn: false, user: null });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
  },
  setLoginStatus: (status, response) => {
    set({ isLoggedIn: status, user: response || null });
    if (status && response) {
      sessionStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('isLoggedIn');
    }
  },
  user: null,
}));

export default useUserStore;
