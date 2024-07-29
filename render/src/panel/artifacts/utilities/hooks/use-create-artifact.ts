import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { ArtifactSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { stars } from '@/render/src/shared/constants'
import { useUploadImageToCloud } from '@/render/src/panel/shared/utilities/hooks/use-upload-image-to-cloud'
import { useOpenStore } from '@/render/src/panel/shared/utilities/store/use-open'
import { useDropImageStore } from '@/render/src/panel/shared/utilities/store/use-drop-image-store'
import { fetchArtifactById } from '@/render/src/panel/artifacts/utilities/services/fetch'
import { updateArtifact } from '@/render/src/panel/artifacts/utilities/services/update'
import { createArtifact } from '@/render/src/panel/artifacts/utilities/services/create'

export const useCreateArtifact = () => {
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
  const onOpen = () => onOpenThis({ name: 'artifact' })
  const isOpen = name === 'artifact'

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
        const { status, data, error } = await fetchArtifactById(id)

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

    const artifactData = {
      ...data,
      id: uuid,
      stars: starsNumber
    }

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        const { status, message, error } = await updateArtifact(
          id,
          artifactData
        )

        if (status === 201) {
          toast.success(message)
          handleUploadImage({ path: 'artifacts', id })
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

      // Subir la imagen y creamos el artefacto
      const { status, message, error } = await createArtifact(artifactData)

      if (status === 201) {
        handleUploadImage({
          path: 'artifacts',
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
