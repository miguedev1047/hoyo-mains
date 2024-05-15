import { create } from 'zustand'

interface DropImageState {
  image: {
    file: File | null
    preview: string
  }
  setImage: (img: { imgFile: File | null; imgPreview: string }) => void
}

export const useDropImage = create<DropImageState>((set) => ({
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
