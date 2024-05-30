import { z } from 'zod'
import { createMaterials } from '@/render/services/panel/materials/create'
import { downloadImage } from '@/utils/helpers/download-image'
import { updateMaterials } from '@/render/services/panel/materials/update'
import { raritys } from '@/constants'
import { useEffect, useState, useTransition } from 'react'
import { dataMaterialById } from '@/render/services/panel/materials/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useDropImage } from '@/utils/store/use-drop-image'
import { useOpen } from '@/utils/store/use-open'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateMaterial = () => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  const { id, open, onOpen, onOpenChange } = useOpen((state) => ({
    id: state.id,
    open: state.open,
    onOpen: state.onOpen,
    onOpenChange: state.onOpenChange
  }))

  const isEditActive = !!id

  const { image, setImage } = useDropImage((state) => ({
    image: state.image,
    setImage: state.setImage
  }))

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
      startTransition(() => {
        dataMaterialById(id)
          .then(({ data }) => {
            setValue('name', data?.name!)
            setValue('type', data?.type!)
            setValue('starsText', data?.starsText!)
            setValue('description', data?.description!)

            setImage({
              imgFile: null,
              imgPreview: data?.imageUrl!
            })
          })
          .catch((error) => {
            toast.error(`${error} Intentalo de nuevo.`)
          })
          .finally(() => {
            setKey(+new Date())
          })
      })
    }
  }, [isEditActive, id, setValue, setImage])

  // Reinicio de los valores del formulario
  useEffect(() => {
    if (!open && !isEditActive) {
      setImage({ imgFile: null, imgPreview: '' })
      reset()
    }
  }, [reset, setImage, open, isEditActive])

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
        path: 'materials',
        imgFile: image.file
      })
      return { url, status, error }
    }

    // Logica para actualizar
    async function handleUpdate(
      id: string,
      data: z.infer<typeof MaterialSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber,
        type: data.type.toLocaleLowerCase(),
        label: data.name,
        value: data.name
      }

      const { message, status, error } = await updateMaterials(id, newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/materials?')
        return
      }

      toast.error(error)
    }

    // Logica para crear
    async function handleCreate(
      data: z.infer<typeof MaterialSchema>,
      uuid: string,
      url: string | null,
      starsNumber: number
    ) {
      const newValues = {
        ...data,
        id: uuid,
        imageUrl: url!,
        stars: starsNumber,
        type: data.type.toLocaleLowerCase(),
        label: data.name,
        value: data.name
      }

      const { message, status, error } = await createMaterials(newValues)

      if (status === 201) {
        toast.success(message)
        handleReset()
        mutate('/api/materials?')
        return
      }

      toast.error(error)
    }

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

      // Subir la imagen y creamos el material
      const { url, status, error } = await uploadImage(image, uuid)

      if (status === 201) {
        await handleCreate(data, uuid, url, starsNumber)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
    })
  })

  return {
    open,
    key,
    control,
    errors,
    isPending,
    isEditActive,
    onSubmit,
    handleReset,
    onOpen,
    onOpenChange
  }
}
