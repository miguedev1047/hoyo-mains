import { z } from 'zod'
import { useEffect, useTransition } from 'react'
import { CharacterConstellationSchema } from '@/schemas'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useModalStore } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { dataConstellationId } from '@/render/services/panel/constellations/data'
import { updateConstellation } from '@/render/services/panel/constellations/update'
import { createContellations } from '@/render/services/panel/constellations/create'
import { useForm } from 'react-hook-form'
import { useUploadImageToCloud } from '@/utils/hooks/panel/use-upload-image-to-cloud'
import { Characters } from '@/types'
import { mutate } from 'swr'
import { toast } from 'sonner'

export const useCreateConstellation = (character: Characters | undefined) => {
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const [isPending, startTransition] = useTransition()
  const { handleUploadImage } = useUploadImageToCloud()

  // Estado globales
  const { id, name, onOpen, onOpenChange } = useModalStore((state) => ({
    id: state.activeModal.id,
    name: state.activeModal.name,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  // Función para abrir el modal
  const onOpenModal = () => onOpen({ name: 'constellation' })
  const modalName = name === 'constellation'

  // Verificar si la edición está activa
  const isEditActive = !!id

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
    if (isEditActive && modalName) {
      startTransition(async () => {
        const { status, data, error } = await dataConstellationId(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)

          setImage({ imgFile: null, imgPreview: data?.imageUrl! })
          return
        }

        toast.error(error)
      })
    }
  }, [isEditActive, modalName, id, setValue, setImage])

  // Reinicio de los valores del formulario
  useEffect(() => {
    if (!modalName && !isEditActive) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, modalName, isEditActive])

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
    const END_POINT = `/api/characters/character?name=${characterName}`

    const values = {
      ...data,
      id: uuid
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { status, message, error } = await updateConstellation(id, values)

        if (status === 201) {
          handleUploadImage({
            path: 'constellations',
            id,
            endpoint: END_POINT
          })
          toast.success(message)
          handleReset()
          mutate(END_POINT)
          return
        }

        toast.error(error)
        return
      }

      // Verificar si se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Subir la imagen y creamos la pasiva
      const { status, message, error } = await createContellations(
        values,
        characterId
      )

      if (status === 201) {
        handleUploadImage({
          path: 'constellations',
          id: uuid,
          endpoint: END_POINT
        })
        toast.success(message)
        handleReset()
        mutate(END_POINT)
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    errors,
    control,
    isEditActive,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  }
}
