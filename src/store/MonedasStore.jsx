import {create} from 'zustand';

export const useMonedasStore = create((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
  selectedCountry: null,
  setSelectedCountry: (p) => set({ selectedCountry:p }),
}));
