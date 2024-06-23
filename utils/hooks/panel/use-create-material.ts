import { z } from 'zod'
import { createMaterials } from '@/render/services/panel/materials/create'
import { updateMaterials } from '@/render/services/panel/materials/update'
import { raritys } from '@/constants'
import { useEffect, useTransition } from 'react'
import { dataMaterialById } from '@/render/services/panel/materials/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalStore } from '@/utils/store/use-open'
import { MaterialSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useUploadImageToCloud } from '@/utils/hooks/panel/use-upload-image-to-cloud'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateMaterial = () => {
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
  const onOpenModal = () => onOpen({ name: 'material' })
  const modalName = name === 'material'

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
        const { status, data, error } = await dataMaterialById(id)

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
    const END_POINT = '/api/materials?'

    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    const values = {
      ...data,
      id: uuid,
      stars: starsNumber
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { status, message, error } = await updateMaterials(id, values)

        if (status === 201) {
          handleUploadImage({
            path: 'materials',
            id,
            endpoint: END_POINT
          })
          mutate(END_POINT)
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
      const { status, message, error } = await createMaterials(values)

      if (status === 201) {
        handleUploadImage({
          path: 'materials',
          id: uuid,
          endpoint: END_POINT
        })
        mutate(END_POINT)
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
    modalName,
    onSubmit,
    onOpenModal,
    onOpenChange
  }
}
