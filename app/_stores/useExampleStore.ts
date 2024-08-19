import { create } from 'zustand';

import createSelectors from '.';

type State = {
  bear: number;
};

type Actions = {
  setBear: (bearCallback: (bear: State['bear']) => State['bear']) => void;
};

const useExampleStoreBase = create<State & Actions>((set) => ({
  bear: 0,
  setBear: (bearCallback) => set((state) => ({ bear: bearCallback(state.bear) })),
}));

export const useExampleStore = createSelectors(useExampleStoreBase);
