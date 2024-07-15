import { create } from 'zustand'

interface EditStatStore {
  isEditingStat: boolean
  isEditingDisabled: boolean
  startEditingStat: (editingStat: boolean) => void
  startEditingDisabled: (editingDisabled: boolean) => void
}

export const useEditStatStore = create<EditStatStore>((set) => ({
  isEditingStat: false,
  isEditingDisabled: false,
  startEditingStat: (editingStat: boolean) =>
    set({ isEditingStat: editingStat }),
  startEditingDisabled: (editingDisabled: boolean) =>
    set({ isEditingDisabled: editingDisabled })
}))
