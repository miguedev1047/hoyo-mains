import { z } from 'zod'
import { CharactersPassiveSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useOpenModal } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { createPassives } from '@/render/services/panel/passives/create'
import { dataPassiveId } from '@/render/services/panel/passives/data'
import { updatePassive } from '@/render/services/panel/passives/update'
import { useForm } from 'react-hook-form'
import { Characters } from '@/types'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreatePassive = (character: Characters | undefined) => {
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
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
    const passiveModal = modalName === 'passive-modal'
    if (isEditActive && passiveModal) {
      startTransition(async () => {
        const { status, data, error } = await dataPassiveId(id)

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
        path: 'passives',
        imgFile: image.file
      })
      return { url, status, error }
    }

    // Logica para actualizar
    async function handleUpdate(
      id: string,
      data: z.infer<typeof CharactersPassiveSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await updatePassive(id, newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    }

    // Logica para crear
    async function handleCreate(
      data: z.infer<typeof CharactersPassiveSchema>,
      uuid: string,
      url: string | null
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!
      }

      const { message, status, error } = await createPassives(
        newValues,
        characterId
      )

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate(`/api/characters/character?name=${characterName}`)
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
