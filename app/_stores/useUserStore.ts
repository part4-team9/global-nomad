import { create } from 'zustand';

import type { Response } from '@/_types/authentication';

interface UserState {
  isLogIn: boolean;
  logout: () => void;
  setLoginStatus: (status: boolean, response?: Response) => void;
  user: Response | null;
}

const useUserStore = create<UserState>((set) => ({
  isLogIn: false,
  logout: () => {
    set({ isLogIn: false, user: null });
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLogIn');
  },
  setLoginStatus: (status, response) => {
    set({ isLogIn: status, user: response || null });
    if (status && response) {
      sessionStorage.setItem('user', JSON.stringify(response));
      sessionStorage.setItem('isLogIn', 'true');
    } else {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('isLogIn');
    }
  },
  user: null,
}));

export default useUserStore;
