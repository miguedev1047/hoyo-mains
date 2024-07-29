import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useEffect, useTransition } from 'react'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { useForm } from 'react-hook-form'
import { MaterialSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { fetchMaterialById } from '@/render/src/panel/materials/utilities/services/fetch'
import { updateMaterial } from '@/render/src/panel/materials/utilities/services/update'
import { createMaterial } from '@/render/src/panel/materials/utilities/services/create'
import { toast } from 'sonner'
import { stars } from '@/render/src/shared/constants'

export const useCreateMaterial = () => {
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
  const onOpen = () => onOpenThis({ name: 'material' })
  const isOpen = name === 'material'

  // Verificar si la edición está activa
  const isEditActive = !!id

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof MaterialSchema>>({
    resolver: zodResolver(MaterialSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: '',
      type: '',
      label: 'none',
      value: 'none',
      starsText: '',
      stars: 0
    }
  })

  // Obtenemos los artefactos para rellenar el formulario
  useEffect(() => {
    if (isEditActive) {
      startTransition(async () => {
        const { status, data, error } = await fetchMaterialById(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)
          setValue('type', data?.type!)
          setValue('starsText', data?.starsText!)
          setValue('stars', data?.stars!)

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

    const values = {
      ...data,
      id: uuid,
      stars: starsNumber
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { status, message, error } = await updateMaterial(id, values)

        if (status === 201) {
          handleUploadImage({
            path: 'materials',
            id
          })
          refresh()
          handleReset()
          toast.success(message)
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

      // Subir la imagen y creamos el material
      const { status, message, error } = await createMaterial(values)

      if (status === 201) {
        handleUploadImage({
          path: 'materials',
          id: uuid
        })
        refresh()
        handleReset()
        toast.success(message)
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
