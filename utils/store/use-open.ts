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
