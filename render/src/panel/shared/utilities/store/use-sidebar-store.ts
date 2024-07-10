import { create } from 'zustand'

interface SidebarStore {
  isOpen: boolean
  onOpenChange: () => void
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  onOpenChange: () => set((state) => ({ isOpen: !state.isOpen }))
}))
