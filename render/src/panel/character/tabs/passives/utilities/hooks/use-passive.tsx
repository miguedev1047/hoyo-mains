import { z } from 'zod'
import { CharactersPassiveSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterType } from '@/render/src/types'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { useRouter } from 'next/navigation'
import { createPassive } from '@/render/src/panel/character/tabs/passives/utilities/services/create'
import { updatePassive } from '@/render/src/panel/character/tabs/passives/utilities/services/update'
import { fetchPassiveById } from '@/render/src/panel/character/tabs/passives/utilities/services/fetch'
import { toast } from 'sonner'

interface PassiveType {
  character: CharacterType
}

export const useCreatePassive = ({ character }: PassiveType) => {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const { handleUploadImage } = useUploadImageToCloud()

  // Estado globales
  const { id, name, onOpen, onOpenChange } = useModalStore((state) => ({
    id: state.activeModal.id,
    name: state.activeModal.name,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const { image, setImage } = useDropImageStore((state) => ({
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
        const { status, data, error } = await fetchPassiveById(id)

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
            id
          })
          toast.success(message)
          handleReset()
          refresh()
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
      const { status, message, error } = await createPassive(
        values,
        characterId
      )

      if (status === 201) {
        handleUploadImage({
          path: 'passives',
          id: uuid
        })
        toast.success(message)
        handleReset()
        refresh()
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
