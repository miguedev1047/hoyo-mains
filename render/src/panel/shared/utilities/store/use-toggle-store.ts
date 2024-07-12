import { create } from 'zustand'

interface ToggleStore {
  toggle: boolean
  setToggle: (toggle: boolean) => void
}

export const useToggleStore = create<ToggleStore>((set) => ({
  toggle: false,
  setToggle: (toggle: boolean) => set({ toggle })
}))
