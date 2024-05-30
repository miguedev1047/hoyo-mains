import { z } from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { CharacterConstellationSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useOpenModal } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { dataConstellationId } from '@/render/services/panel/constellations/data'
import { updateConstellation } from '@/render/services/panel/constellations/update'
import { createContellations } from '@/render/services/panel/constellations/create'
import { useForm } from 'react-hook-form'
import { Characters } from '@/types'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateConstellation = (character: Characters | undefined) => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  const { id, isOpen, modalName, onOpen, onOpenChange } = useOpenModal(
    (state) => ({
      id: state.id,
      isOpen: state.open.isOpen,
      modalName: state.open.modalName,
      onOpen: state.onOpen,
      onOpenChange: state.onOpenChange
    })
  )

  const isEditActive = !!id

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterConstellationSchema>>({
    resolver: zodResolver(CharacterConstellationSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: ''
    }
  })

  // Obtenemos las constelaciones para rellenar el formulario
  useEffect(() => {
    const constellationModal = modalName === 'constellation-modal'
    if (isEditActive && constellationModal) {
      startTransition(async () => {
        const { status, data, error } = await dataConstellationId(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)

          setImage({ imgFile: null, imgPreview: data?.imageUrl! })
          setKey(+new Date())
          return
        }

        toast.error(error)
      })
    }
  }, [isEditActive, modalName, id, setValue, setImage])

  // Reinicio de los valores del formulario
  useEffect(() => {
    if (!isOpen && !isEditActive) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, isOpen, isEditActive])

  // Función para resetear el formulario
  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  // Logica de la función onSubmit
  const onSubmit = handleSubmit((data) => {
    const uuid = crypto.randomUUID()
    const characterId = character?.id

    // Logica para subir una imagen
    async function uploadImage(
      image: { file: File | null },
      id: string | null
    ) {
      const { url, status, error } = await downloadImage({
        id: id!,
        path: 'constellations',
        imgFile: image.file
      })
      return { url, status, error }
    }

    // Logica para actualizar
    async function handleUpdate(
      id: string,
      data: z.infer<typeof CharacterConstellationSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await updateConstellation(
        id,
        newValues
      )

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate(`/api/characters/character/${character?.id}`)
        return
      }

      toast.error(error)
    }

    // Logica para crear
    async function handleCreate(
      data: z.infer<typeof CharacterConstellationSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await createContellations(
        newValues,
        characterId
      )

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate(`/api/characters/character/${character?.id}`)
        return
      }

      toast.error(error)
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { url, status, error } = await uploadImage(image, id)

        if (status === 201) {
          await handleUpdate(id, data, uuid, url)
          return
        }

        toast.error(`${error} Intentalo denuevo.`)
        return
      }

      // Verificar si se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Subir la imagen y creamos la pasiva
      const { url, status, error } = await uploadImage(image, uuid)

      if (status === 201) {
        await handleCreate(data, uuid, url)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
    })
  })

  return {
    key,
    isPending,
    errors,
    control,
    modalName,
    isEditActive,
    onSubmit,
    onOpen,
    onOpenChange
  }
}