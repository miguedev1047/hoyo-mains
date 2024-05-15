import { storage } from '@/libs/firebase-config'
import { deleteObject, ref } from 'firebase/storage'

interface Props {
  path: string
  id: string
}

export const deleteImage = async ({ path: path, id: id }: Props) => {
  try {
    const imageRef = ref(storage, `${path}/${id}`)
    await deleteObject(imageRef)

    return { message: 'Imagen eliminada.', status: 201 }
  } catch (error: any) {
    if (error.code === 'storage/object-not-found') {
      return { status: 400, error: 'Error al encontrar la imagen.' }
    }
    return { status: 400, error: 'Ha ocurrido un error.' }
  }
}
