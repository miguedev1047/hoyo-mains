import { useDropImage } from '@/utils/store/use-drop-image'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Image } from '@nextui-org/image'
import { IconPhoto } from '@tabler/icons-react'

const DropImage = () => {
  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  useEffect(() => {
    if (image.file) {
      URL.revokeObjectURL(image.preview)
    }
  }, [image])

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setImage({
        imgFile: acceptedFiles[0],
        imgPreview: URL.createObjectURL(acceptedFiles[0])
      })
    },
    [setImage]
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
      maxFiles: 1
    })

  const showFileRejected = fileRejections[0]?.errors[0].code

  return (
    <div
      className={`col-span-2 flex items-center gap-4 text-center text-2xl cursor-pointer border-2 rounded-xl p-4 ${
        isDragActive
          ? 'border-blue-500 text-blue-500'
          : 'border-color-light/75 '
      }`}
      {...getRootProps()}
    >
      <div className='aspect-square size-40 grid place-items-center rounded-xl'>
        <input {...getInputProps()} />
        {isDragActive ? (
          <IconPhoto size={96} />
        ) : image.file ? (
          <Image
            width={120}
            height={120}
            className='size-24'
            src={URL.createObjectURL(image.file)}
            alt='Imagen de personaje'
          />
        ) : image.preview ? (
          <Image
            isBlurred
            width={120}
            height={120}
            className='size-24'
            src={image.preview}
            alt='Imagen de personaje'
          />
        ) : (
          <IconPhoto size={96} />
        )}
      </div>

      <div className='w-full'>
        {isDragActive ? (
          <p className='text-xl text-blue-500'>Suelta la imagen aquí...</p>
        ) : (
          <p className='text-xl text-color-light/75'>
            Arrastra una imagen aquí o haz click para seleccionar una imagen.
          </p>
        )}

        {showFileRejected === 'file-invalid-type' && (
          <p className='text-sm text-color-red font-medium'>
            El archivo seleccionado no es una imagen. Por favor, selecciona un
            archivo de imagen.
          </p>
        )}
      </div>
    </div>
  )
}

export default DropImage
