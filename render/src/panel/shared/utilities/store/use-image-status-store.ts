import { create } from 'zustand'

interface ImageStatusStore {
  status: string
  progress: number
  setStatus: (status: string) => void
  setProgress: (progress: number) => void
}

export const useImageStatusStore = create<ImageStatusStore>((set) => ({
  status: 'idle',
  progress: 0,
  setStatus: (status: string) => set({ status }),
  setProgress: (progress: number) => set({ progress })
}))
