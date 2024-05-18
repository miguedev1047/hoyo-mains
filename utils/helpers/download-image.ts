import { storage } from '@/libs/firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface Props {
  path: string
  id: string
  imgFile: File | null | undefined
}

export const downloadImage = async ({
  path: path,
  id: id,
  imgFile: imgFile
}: Props) => {
  try {
    const metadata = { contentType: 'image/webp' }
    const imageRef = ref(storage, `${path}/${id}`)

    const exitsImageUrl = await getDownloadURL(imageRef)
      .then((url) => url)
      .catch(() => null)

    if (!!exitsImageUrl && !imgFile) {
      return {
        url: exitsImageUrl as unknown as string,
        message: 'Imagen descargada con éxito.',
        status: 201
      }
    }

    if (imgFile) {
      const imageUrl = await uploadBytes(imageRef, imgFile, metadata).then(
        async () => {
          const url = await getDownloadURL(imageRef)
          return url
        }
      )

      return {
        url: imageUrl as unknown as string,
        message: 'Imagen subida con éxito.',
        status: 201
      }
    }

    return {
      url: null as unknown as string,
      message: 'No se ha podido subir la imagen.',
      status: 400
    }
  } catch (error) {
    return { url: null, error: 'Error al subir la imagen.', status: 500 }
  }
}
