import { raritys } from '@/constants'
import { createWapons } from '@/render/services/panel/weapons/create'
import { dataWeaponsById } from '@/render/services/panel/weapons/data'
import { updateWapons } from '@/render/services/panel/weapons/update'
import { WeaponSchema } from '@/schemas'
import { downloadImage } from '@/utils/helpers/download-image'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useModalStore } from '@/utils/store/use-open'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { z } from 'zod'

export const useCreateWeapon = () => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

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
  const onOpenModal = () => onOpen({ name: 'weapon' })
  const modalName = name === 'weapon'

  // Verificar si la edición está activa
  const isEditActive = !!id

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof WeaponSchema>>({
    resolver: zodResolver(WeaponSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      stat: '',
      name: '',
      description: '',
      type: '',
      starsText: '',
      stars: 0
    }
  })

  // Obtenemos los artefactos para rellenar el formulario
  useEffect(() => {
    if (isEditActive) {
      startTransition(async () => {
        const { status, data, error } = await dataWeaponsById(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)
          setValue('type', data?.type!)
          setValue('stat', data?.stat!)
          setValue('starsText', data?.starsText!)
          setValue('stars', data?.stars!)

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
        path: 'weapons',
        imgFile: image.file
      })

      mutate('/api/weapons')
      return { url, status, error }
    }

    // Logica para actualizar
    async function handleUpdate(
      id: string,
      data: z.infer<typeof WeaponSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber,
        type: data.type.toLocaleLowerCase()
      }

      const { message, status, error } = await updateWapons(id, newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/weapons')
        return
      }

      toast.error(error)
    }

    // Logica para crear
    async function handleCreate(
      data: z.infer<typeof WeaponSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber,
        stat: data.stat.toLocaleLowerCase(),
        type: data.type.toLocaleLowerCase()
      }

      const { message, status, error } = await createWapons(newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/weapons?')
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

      // Verificar si no se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Subir la imagen y creamos el arma
      const { url, status, error } = await uploadImage(image, uuid)

      if (status === 201) {
        await handleCreate(data, uuid, url, starsNumber)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
    })
  })

  return {
    key,
    control,
    errors,
    isPending,
    isEditActive,
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  }
}
