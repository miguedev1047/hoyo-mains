import { create } from 'zustand'

interface OpenState {
  open: boolean
  id: string
  onOpen: (open: boolean) => void
  onOpenChange: () => void
  setId: (id: string) => void
}

interface OpenModalState {
  id: string
  open: {
    isOpen: boolean
    modalName: string
  }
  onOpen: (open: boolean, modalName: string) => void
  onOpenChange: () => void
  setId: (id: string) => void
}

export const useOpen = create<OpenState>((set) => ({
  open: false,
  id: '',
  onOpen: (open: boolean) => set({ open }),
  onOpenChange: () =>
    set((state: { open: boolean }) => ({ open: !state.open, id: '' })),
  setId: (id: string) => set({ id })
}))

export const useOpenModal = create<OpenModalState>((set) => ({
  id: '',
  open: {
    isOpen: false,
    modalName: ''
  },
  onOpen: (open: boolean, modalName: string) =>
    set({ open: { isOpen: open, modalName } }),
  onOpenChange: () =>
    set((state: OpenModalState) => ({
      id: '',
      open: { isOpen: !state.open.isOpen, modalName: '' }
    })),
  setId: (id: string) => set({ id })
}))
