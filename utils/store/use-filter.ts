import { create } from 'zustand'

interface FilterStore {
  rarity: number
  element: string
  searchValue: string
  weapon: string
  setRarity: (rarity: number) => void
  setElement: (element: string) => void
  setWeapon: (weapon: string) => void
  setSearchValue: (searchValue: string) => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  rarity: 0,
  searchValue: '',
  element: '',
  weapon: '',
  setRarity: (rarity: number) => set({ rarity }),
  setElement: (element: string) => set({ element }),
  setWeapon: (weapon: string) => set({ weapon }),
  setSearchValue: (searchValue: string) => set({ searchValue })
}))
