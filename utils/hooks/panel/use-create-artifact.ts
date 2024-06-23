import { z } from 'zod'
import { raritys } from '@/constants'
import { dataArtifactById } from '@/render/services/panel/artifacts/data'
import { createArtifacts } from '@/render/services/panel/artifacts/create'
import { updateArtifacts } from '@/render/services/panel/artifacts/update'
import { useModalStore } from '@/utils/store/use-open'
import { ArtifactSchema } from '@/schemas'
import { useDropImage } from '@/utils/store/use-drop-image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useUploadImageToCloud } from '@/utils/hooks/panel/use-upload-image-to-cloud'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateArtifact = () => {
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
  const onOpenModal = () => onOpen({ name: 'artifact' })
  const modalName = name === 'artifact'

  // Verificar si la edición está activa
  const isEditActive = !!id

  const {
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof ArtifactSchema>>({
    resolver: zodResolver(ArtifactSchema),
    defaultValues: {
      id: 'none',
      imageUrl: 'none',
      name: '',
      description: '',
      starsText: '',
      stars: 0
    }
  })

  useEffect(() => {
    if (isEditActive) {
      startTransition(async () => {
        const { status, data, error } = await dataArtifactById(id)

        if (status === 201) {
          setValue('name', data?.name!)
          setValue('description', data?.description!)
          setValue('starsText', data?.starsText!)

          setImage({ imgFile: null, imgPreview: data?.imageUrl! })
          return
        }

        toast.error(error)
      })
    }
  }, [id, isEditActive, setImage, setValue])

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
    const END_POINT = '/api/artifacts'

    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    const artifactData = {
      ...data,
      id: uuid,
      stars: starsNumber
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { status, message, error } = await updateArtifacts(
          id,
          artifactData
        )

        if (status === 201) {
          handleUploadImage({ path: 'artifacts', id, endpoint: END_POINT })
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

      // Subir la imagen y creamos el artefacto
      const { status, message, error } = await createArtifacts(artifactData)

      if (status === 201) {
        handleUploadImage({
          path: 'artifacts',
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
    onOpen,
    onOpenModal,
    onOpenChange
  }
}
