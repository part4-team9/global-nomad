import { create } from 'zustand';

import type { GetUserType } from '@/_types/user';

import createSelectors from '.';

type State = {
  userProfile: GetUserType | null;
};

type Actions = {
  setUserProfile: (userProfileCallback: (userProfile: State['userProfile']) => State['userProfile']) => void;
};

const userProfileStoreBase = create<State & Actions>((set) => ({
  userProfile: null,
  setUserProfile: (userProfileCallback) => set((state) => ({ userProfile: userProfileCallback(state.userProfile) })),
}));

export const useUserProfileStore = createSelectors(userProfileStoreBase);
