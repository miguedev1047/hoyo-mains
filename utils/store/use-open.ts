import { create } from 'zustand'

interface OpenState {
  open: boolean
  id: string
  onOpen: (open: boolean) => void
  onOpenChange: () => void
  setId: (id: string) => void
}

export const useOpen = create<OpenState>((set) => ({
  open: false,
  id: '',
  onOpen: (open: boolean) => set({ open }),
  onOpenChange: () =>
    set((state: { open: boolean }) => ({ open: !state.open, id: ''})),
  setId: (id: string) => set({ id })
}))
