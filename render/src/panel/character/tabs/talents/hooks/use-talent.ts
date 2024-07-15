import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterTalentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchTalentById } from '../services/fetch'
import { updateTalent } from '../services/update'
import { createTalent } from '../services/create'
import { toast } from 'sonner'

interface TalentType {
  character: CharacterType
}

export const useCreateTalent = ({ character }: TalentType) => {
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
  const onOpenModal = () => onOpen({ name: 'talent' })
  const modalName = name === 'talent'

  // Verificar si la edición está activa
  const isEditActive = !!id

  const {
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterTalentSchema>>({
    resolver: zodResolver(CharacterTalentSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: ''
    }
  })

  // Obtenemos los talentos para rellenar el formulario
  useEffect(() => {
    if (isEditActive && modalName) {
      startTransition(async () => {
        const { status, data, error } = await fetchTalentById(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)

          setImage({ imgFile: null, imgPreview: data?.imageUrl ?? '' })
          return
        }

        toast.error(error)
      })
    }
  }, [isEditActive, id, modalName, setValue, setImage])

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
        const { status, message, error } = await updateTalent(id, values)

        if (status === 201) {
          handleUploadImage({
            path: 'talents',
            id
          })
          toast.success(message)
          handleReset()
          return
        }

        toast.error(error)
        return
      }

      // Verificar si no se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Subir la imagen y creamos el talento
      const { status, message, error } = await createTalent(
        values,
        characterId
      )

      if (status === 201) {
        handleUploadImage({
          path: 'talents',
          id: uuid
        })
        toast.success(message)
        handleReset()
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
