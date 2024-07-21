import { create } from 'zustand'

interface OpenPopover {
  open: boolean
  itemId: string
  setOpen: ({ open, itemId }: { open: boolean; itemId: string }) => void
}

export const useOpenPopover = create<OpenPopover>((set) => ({
  open: false,
  itemId: '',
  setOpen: ({ open, itemId }) => set(() => ({ open, itemId }))
}))
