import { z } from 'zod'
import { useEffect, useTransition } from 'react'
import { useOpen } from '@/utils/store/use-open'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { raritys } from '@/constants'
import { CharacterSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { createCharacters } from '@/render/services/panel/characters/create'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateCharacter = () => {
  const [isPending, startTransition] = useTransition()

  const { open, onOpen, onOpenChange } = useOpen((state) => ({
    open: state.open,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

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
    if (!open) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, open])

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

    // Logica para subir una imagen
    async function uploadImage(
      image: { file: File | null },
      id: string | null
    ) {
      const { url, status, error } = await downloadImage({
        id: id!,
        path: 'characters',
        imgFile: image.file!
      })

      return { url, status, error }
    }

    // Función para crear los personajes
    async function handleCreate(
      data: z.infer<typeof CharacterSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        name: data.name.toLowerCase(),
        id: uuid,
        imageUrl: url!,
        stars: starsNumber
      }

      const { message, status, error } = await createCharacters(newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/characters')
        return
      }

      toast.error(error)
    }

    startTransition(async () => {
      // Verificar si no se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Logica para subir la imagen y crear el personaje
      const { url, status, error } = await uploadImage(image, uuid)

      if (status === 201) {
        await handleCreate(data, uuid, url, starsNumber)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
    })
  })

  return {
    errors,
    isPending,
    control,
    open,
    onSubmit,
    onOpenChange,
    onOpen
  }
}
