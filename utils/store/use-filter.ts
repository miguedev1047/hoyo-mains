import { create } from 'zustand'

interface FilterStore {
  rarity: number
  element: string
  weapon: string
  setRarity: (rarity: number) => void
  setElement: (element: string) => void
  setWeapon: (weapon: string) => void
  updateFilter: (state: any) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  rarity: 0,
  element: '',
  weapon: '',
  setRarity: (rarity: number) => set({ rarity }),
  setElement: (element: string) => set({ element }),
  setWeapon: (weapon: string) => set({ weapon }),
  updateFilter: ({ rarity = '', element = '', weapon = '' }) =>
    set((state) => ({ ...state, rarity, element, weapon }))
}))
