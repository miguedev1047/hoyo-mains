import { create } from 'zustand'

interface ViewStore {
  isOpen: boolean
  cardId: string
  setIsOpen: (isOpen: boolean, cardId: string) => void
}

export const useViewStore = create<ViewStore>((set) => ({
  isOpen: false,
  cardId: '',
  setIsOpen: (isOpen: boolean, cardId: string) => set({ isOpen, cardId })
}))
