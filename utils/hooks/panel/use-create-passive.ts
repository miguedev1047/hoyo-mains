import { z } from 'zod'
import { CharacterTypes } from '@/types'
import { CharactersPassiveSchema } from '@/schemas'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useModalStore } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { createPassives } from '@/render/services/panel/passives/create'
import { dataPassiveId } from '@/render/services/panel/passives/data'
import { updatePassive } from '@/render/services/panel/passives/update'
import { useForm } from 'react-hook-form'
import { useUploadImageToCloud } from '@/utils/hooks/panel/use-upload-image-to-cloud'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreatePassive = (character: CharacterTypes | undefined) => {
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
  const onOpenModal = () => onOpen({ name: 'passive' })
  const modalName = name === 'passive'

  // Verificar si la edición está activa
  const isEditActive = !!id

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof CharactersPassiveSchema>>({
    resolver: zodResolver(CharactersPassiveSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: ''
    }
  })

  // Obtenemos los artefactos para rellenar el formulario
  useEffect(() => {
    if (isEditActive && modalName) {
      startTransition(async () => {
        const { status, data, error } = await dataPassiveId(id)

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
        const { status, message, error } = await updatePassive(id, values)

        if (status === 201) {
          handleUploadImage({
            path: 'passives',
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
      const { status, message, error } = await createPassives(
        values,
        characterId
      )

      if (status === 201) {
        handleUploadImage({
          path: 'passives',
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
