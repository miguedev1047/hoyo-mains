import { storage } from '@/libs/firebase-config'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { uploadImageTheCloud } from '@/render/src/panel/shared/services/upload'
import { useImageStatusStore } from '@/render/src/panel/shared/utilities/store/use-image-status-store'
import { useCurrentRole } from '@/render/src/shared/utilities/hooks/use-sesion'
import { useRouter } from 'next/navigation'

interface Props {
  path: string
  id: string
}

export const useUploadImageToCloud = () => {
  const { refresh } = useRouter()
  const role = useCurrentRole()

  const { setProgress, setStatus } = useImageStatusStore((state) => ({
    setStatus: state.setStatus,
    setProgress: state.setProgress
  }))

  const { image, setImage } = useDropImageStore((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  const handleUploadImage = ({ path, id }: Props) => {
    const imageFile = image.file!
    if (role !== 'ADMIN' && role !== 'OWNER') return
    if (!imageFile) return

    const metadata = { contentType: 'image/webp' }
    const imageRef = ref(storage, `${path}/${id}`)

    const uploadTask = uploadBytesResumable(imageRef, imageFile, metadata)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
        setStatus('uploading')
      },
      (error) => {
        setProgress(0)
        setStatus('idle')
        console.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
          const imageUrl = downloadUrl
          const { status } = await uploadImageTheCloud({ imageUrl, id, path })

          // Si la imagen se subió con éxito
          if (status === 201) {
            setImage({ imgFile: null, imgPreview: '' })
            setProgress(0)
            setStatus('idle')
            refresh()
          }

          // Si hubo un error al subir la imagen
          setImage({ imgFile: null, imgPreview: '' })
          setProgress(0)
          setStatus('error')
        })
      }
    )
  }

  return { handleUploadImage }
}
