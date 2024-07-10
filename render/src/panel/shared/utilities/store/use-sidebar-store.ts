import { create } from 'zustand'

interface modalStore {
  activeModal: {
    id: string
    name: string
  }
  onOpenChange: () => void
  onOpen: ({ name }: { name: string }) => void
  setModalId: (id: string) => void
}

interface sidebarStore {
  isOpen: boolean
  onOpenChange: () => void
}

export const useModalStore = create<modalStore>((set) => ({
  activeModal: {
    id: '',
    name: ''
  },
  onOpenChange: () => set(() => ({ activeModal: { id: '', name: '' } })),
  onOpen: ({ name }) =>
    set((state) => ({ activeModal: { ...state.activeModal, name } })),
  setModalId: (id: string) =>
    set((state) => ({ activeModal: { ...state.activeModal, id } }))
}))

export const useSidebarStore = create<sidebarStore>((set) => ({
  isOpen: false,
  onOpenChange: () => set((state) => ({ isOpen: !state.isOpen }))
}))
