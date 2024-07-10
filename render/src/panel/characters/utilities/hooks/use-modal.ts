import { z } from 'zod'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { raritys } from '@/constants'
import { CharacterSchema } from '@/schemas'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useModalStore } from '@/render/src/panel/shared/utilities/store/use-modal-store'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { createCharacters } from '@/render/src/panel/characters/utilities/services/create'

export const useModal = () => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()
  const { handleUploadImage } = useUploadImageToCloud()

  // Estado globales
  const { name, onOpen, onOpenChange } = useModalStore((state) => ({
    name: state.activeModal.name,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const { image, setImage } = useDropImageStore((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  // Función para abrir el modal
  const onOpenModal = () => onOpen({ name: 'character' })
  const modalName = name === 'character'

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterSchema>>({
    resolver: zodResolver(CharacterSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      element: '',
      role: '',
      weapon: '',
      starsText: '',
      stars: 0
    }
  })

  // Función para resetear el formulario
  useEffect(() => {
    if (!modalName) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, modalName])

  // Función para resetear el formulario
  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  // Logica de la función onSubmit
  const onSubmit = handleSubmit(async (data) => {
    const uuid = crypto.randomUUID()

    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    const characterData = {
      ...data,
      name: data.name.toLowerCase(),
      id: uuid,
      stars: starsNumber
    }

    startTransition(async () => {
      // Verificar si no se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Logica para subir la imagen y crear el personaje
      const { message, status, error } = await createCharacters(characterData)

      if (status === 201) {
        handleUploadImage({ path: 'characters', id: uuid })
        handleReset()
        refresh()
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

  return {
    errors,
    isPending,
    control,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  }
}
