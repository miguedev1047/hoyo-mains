import { storage } from '../../libs/firebase-config'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { uploadImage } from './upload-image'
import { mutate } from 'swr'

interface Props {
  path: string
  id: string
  imgFile: File | null | undefined
}

const routes = ['/api/characters']

export const downloadImage = async ({
  path: path,
  id: id,
  imgFile: imgFile
}: Props) => {
  const metadata = { contentType: 'image/webp' }
  const imageRef = ref(storage, `${path}/${id}`)
  if (!imageRef || !imgFile) return

  return uploadBytes(imageRef, imgFile, metadata).then(async () => {
    const downloadURL = await getDownloadURL(imageRef)
    await uploadImage({ path: path, id: id, imgUrl: downloadURL })

    console.log('Image uploaded successfully')

    routes.forEach((route) => mutate(route))
  })
}
