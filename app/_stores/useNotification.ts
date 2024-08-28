// import { create } from 'zustand';

// import type { MyNotification } from '@/_libs/notificationService';

// import createSelectors from '.';

// type State = {
//   notification: MyNotification[];
// };

// type Actions = {
//   setNotification: (bearCallback: (bear: State['notification']) => State['notification']) => void;
// };

// const useExampleStoreBase = create<State & Actions>((set) => ({
//   bear: 0,
//   setBear: (bearCallback) => set((state) => ({ bear: bearCallback(state.bear) })),
// }));

// export const useExampleStore = createSelectors(useExampleStoreBase);
