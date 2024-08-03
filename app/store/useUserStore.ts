import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  setLoginStatus: (status: boolean) => void;
}

const useUserStore = create<UserState>((set) => ({
  isLoggedIn: false,
  setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
}));

export default useUserStore;
