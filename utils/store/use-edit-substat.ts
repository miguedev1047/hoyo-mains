import { create } from 'zustand'

interface State {
  isEditingStat: boolean
  isEditingDisabled: boolean
  startEditingStat: (editingStat: boolean) => void
  startEditingDisabled: (editingDisabled: boolean) => void
}

export const useEditStatStore = create<State>((set) => ({
  isEditingStat: false,
  isEditingDisabled: false,
  startEditingStat: (editingStat: boolean) =>
    set({ isEditingStat: editingStat }),
  startEditingDisabled: (editingDisabled: boolean) =>
    set({ isEditingDisabled: editingDisabled })
}))
