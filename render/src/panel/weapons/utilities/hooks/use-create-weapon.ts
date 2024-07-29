import { z } from 'zod'
import { stars } from '@/render/src/shared/constants'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { WeaponSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { fetchWeaponsById } from '@/render/src/panel/weapons/utilities/services/fetch'
import { updateWeapon } from '@/render/src/panel/weapons/utilities/services/update'
import { createWeapon } from '@/render/src/panel/weapons/utilities/services/create'
import { toast } from 'sonner'

export const useCreateWeapon = () => {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const { handleUploadImage } = useUploadImageToCloud()

  // Estado globales
  const { id, name, onOpenThis, onOpenChange } = useOpenStore((state) => ({
    id: state.active.id,
    name: state.active.name,
    onOpenThis: state.onOpenThis,
    onOpenChange: state.onOpenChange
  }))

  const { image, setImage } = useDropImageStore((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

  // Función para abrir el modal
  const onOpen = () => onOpenThis({ name: 'weapon' })
  const isOpen = name === 'weapon'

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
      stars: 0,
      atk: '0'
    }
  })

  // Obtenemos los artefactos para rellenar el formulario
  useEffect(() => {
    if (isEditActive) {
      startTransition(async () => {
        const { status, data, error } = await fetchWeaponsById(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)
          setValue('type', data?.type!)
          setValue('stat', data?.stat!)
          setValue('starsText', data?.starsText!)
          setValue('stars', data?.stars!)
          setValue('atk', data?.atk.toString()!)

          setImage({ imgFile: null, imgPreview: data?.imageUrl! })
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
      stars.find((star) => star.name === data.starsText)?.value[0]
    )

    const weaponData = {
      ...data,
      id: uuid,
      stars: starsNumber
    }

    // Logica de la función onSubmit
    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { message, status, error } = await updateWeapon(id, weaponData)

        if (status === 201) {
          handleUploadImage({
            path: 'weapons',
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

      // Verificar si no se subió una imagen
      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // Subir la imagen y creamos el arma
      const { message, status, error } = await createWeapon(weaponData)

      if (status === 201) {
        handleUploadImage({
          path: 'weapons',
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
    control,
    errors,
    isPending,
    isEditActive,
    isOpen,
    onSubmit,
    onOpen,
    onOpenChange
  }
}
