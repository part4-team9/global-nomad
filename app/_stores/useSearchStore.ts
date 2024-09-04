import { create } from 'zustand';

interface SearchStoreState {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const useSearchStore = create<SearchStoreState>((set) => ({
  searchValue: '',
  setSearchValue: (value: string) => set({ searchValue: value }),
}));

export default useSearchStore;
