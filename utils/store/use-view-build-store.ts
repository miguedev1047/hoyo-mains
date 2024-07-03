import { create } from 'zustand'

interface ViewBuildStore {
  isOpen: boolean
  cardId: string
  setIsOpen: (isOpen: boolean, cardId: string) => void
}

export const useViewBuildStore = create<ViewBuildStore>((set) => ({
  isOpen: false,
  cardId: '',
  setIsOpen: (isOpen: boolean, cardId: string) => set({ isOpen, cardId })
}))
