import { create } from 'zustand';

import createSelectors from '.';
import { UserProfileData } from '@/_types/user';

type State = {
  userProfile: UserProfileData | null;
};

type Actions = {
  setUserProfile: (userProfileCallback: (userProfile: State['userProfile']) => State['userProfile']) => void;
};

const userProfileStoreBase = create<State & Actions>((set) => ({
  userProfile: null,
  setUserProfile: (userProfileCallback) => set((state) => ({ userProfile: userProfileCallback(state.userProfile) })),
}));

export const useUserProfileStore = createSelectors(userProfileStoreBase);
