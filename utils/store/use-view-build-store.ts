import { create } from 'zustand'

interface ViewBuildStore {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const useViewBuildStore = create<ViewBuildStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen })
}))
