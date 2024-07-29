import { create } from 'zustand'

interface State {
  active: {
    id: string
    name: string
  }
}

interface Actions {
  onOpenChange: () => void
  onOpenThis: ({ name }: { name: string }) => void
  setId: (id: string) => void
}

export const useOpenStore = create<State & Actions>((set) => ({
  active: {
    id: '',
    name: ''
  },
  onOpenChange: () => set(() => ({ active: { id: '', name: '' } })),
  onOpenThis: ({ name }) => set((state) => ({ active: { ...state.active, name } })),
  setId: (id: string) => set((state) => ({ active: { ...state.active, id } }))
}))
