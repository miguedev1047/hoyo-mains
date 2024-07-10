import { create } from 'zustand'

interface DropImageStore {
  image: {
    file: File | null
    preview: string
  }
  setImage: (img: { imgFile: File | null; imgPreview: string }) => void
}

export const useDropImageStore = create<DropImageStore>((set) => ({
  image: {
    file: null,
    preview: ''
  },
  setImage: ({ imgFile, imgPreview }) => {
    set(() => ({
      image: {
        file: imgFile,
        preview: imgPreview
      }
    }))
  }
}))
