import { z } from 'zod'
import { createTalents } from '@/render/services/panel/talents/create'
import { dataTalentById } from '@/render/services/panel/talents/data'
import { updateTalents } from '@/render/services/panel/talents/update'
import { CharacterTalentSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useOpenModal } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { Characters } from '@/types'

export const useCreateTalent = (character: Characters | undefined) => {
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
  } = useForm<z.infer<typeof CharacterTalentSchema>>({
    resolver: zodResolver(CharacterTalentSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: ''
    }
  })

  // Cargar los datos del talento a editar
  useEffect(() => {
    if (isEditActive) {
      startTransition(async () => {
        const { status, data, error } = await dataTalentById(id)

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
  }, [isEditActive, id, setValue, setImage])

  // Reinicio de los valores del formulario
  useEffect(() => {
    if (!isOpen && !isEditActive) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, isOpen, isEditActive])

  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

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
        path: 'talents',
        imgFile: image.file
      })
      return { url, status, error }
    }

    // Logica para actualizar un talento
    async function handleUpdate(
      id: string,
      data: z.infer<typeof CharacterTalentSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await updateTalents(id, newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate(`/api/characters/character/${character?.id}`)
        return
      }

      toast.error(error)
    }

    async function handleCreate(
      data: z.infer<typeof CharacterTalentSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await createTalents(
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

    // Logica de la función onSubmit
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

      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Creamos el talento con la imagen subida
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
