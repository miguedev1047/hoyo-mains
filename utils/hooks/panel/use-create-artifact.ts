import { z } from 'zod'
import { raritys } from '@/constants'
import { createArtifacts } from '@/render/services/panel/artifacts/create'
import { dataArtifactById } from '@/render/services/panel/artifacts/data'
import { updateArtifacts } from '@/render/services/panel/artifacts/update'
import { ArtifactSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useOpen } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateArtifact = () => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  const { id, open, onOpen, onOpenChange } = useOpen((state) => ({
    id: state.id,
    open: state.open,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const isEditActive = !!id

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof ArtifactSchema>>({
    resolver: zodResolver(ArtifactSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      descTwoPieces: '',
      descFourPieces: '',
      starsText: '',
      stars: 0
    }
  })

  // Llamada a la API para obtener los datos del material
  useEffect(() => {
    if (isEditActive) {
      startTransition(() => {
        dataArtifactById(id)
          .then(({ data }) => {
            setValue('name', data?.name!)
            setValue('starsText', data?.starsText!)
            setValue('descTwoPieces', data?.descTwoPieces!)
            setValue('descFourPieces', data?.descFourPieces!)

            setImage({
              imgFile: null,
              imgPreview: data?.imageUrl!
            })
          })
          .catch((error) => {
            toast.error(`${error} Intentalo de nuevo.`)
          })
          .finally(() => {
            setKey(+new Date())
          })
      })
    }
  }, [isEditActive, id, setValue, setImage])

  // Reinicio de los valores del formulario
  useEffect(() => {
    if (!open && !isEditActive) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, open, isEditActive])

  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  const onSubmit = handleSubmit((data) => {
    const uuid = crypto.randomUUID()

    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    async function uploadImage(
      image: { file: File | null },
      id: string | null
    ) {
      const { url, status, error } = await downloadImage({
        id: id!,
        path: 'artifacts',
        imgFile: image.file
      })
      return { url, status, error }
    }

    // Logica para actualizar un artefacto
    async function handleUpdate(
      id: string,
      data: z.infer<typeof ArtifactSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber
      }

      const { message, status, error } = await updateArtifacts(id, newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/artifacts')
        return
      }

      toast.error(error)
    }

    // Logica para crear un material
    async function handleCreate(
      data: z.infer<typeof ArtifactSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber
      }

      const { message, status, error } = await createArtifacts(newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/artifacts')
        return
      }

      toast.error(error)
    }

    // Logica de la función onSubmit
    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { url, status, error } = await uploadImage(image, id)

        if (status === 201) {
          await handleUpdate(id, data, uuid, url, starsNumber)
          return
        }

        toast.error(`${error} Intentalo denuevo.`)
        return
      }

      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Creamos el material con la imagen subida
      const { url, status, error } = await uploadImage(image, uuid)

      if (status === 201) {
        await handleCreate(data, uuid, url, starsNumber)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
    })
  })

  return {
    open,
    key,
    control,
    errors,
    isPending,
    isEditActive,
    onSubmit,
    handleReset,
    onOpen,
    onOpenChange
  }
}
