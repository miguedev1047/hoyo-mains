import { z } from 'zod'
import { createMaterials } from '@/render/services/panel/materials/create'
import { downloadImage } from '../helpers/download-image'
import { updateMaterials } from '@/render/services/panel/materials/update'
import { raritys } from '@/constants'
import { useEffect, useState, useTransition } from 'react'
import { dataMaterialById } from '@/render/services/panel/materials/data'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSchema } from '@/schemas'
import { useForm } from 'react-hook-form'
import { useDropImage } from '../store/use-drop-image'
import { useOpen } from '../store/use-open'
import { toast } from 'sonner'
import { mutate } from 'swr'

export const useCreateMaterial = (onOpenChange: () => void) => {
  const [isPending, startTransition] = useTransition()
  const [key, setKey] = useState(+new Date())

  const { id, open } = useOpen((state) => ({
    id: state.id,
    open: state.open
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
      description: '',
      id: 'none',
      imageUrl: 'none',
      name: '',
      type: '',
      label: 'none',
      value: 'none',
      starsText: '',
      stars: 0
    }
  })

  // Llamada a la API para obtener los datos del material
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

  const handleReset = () => {
    reset()
    setImage({ imgFile: null, imgPreview: '' })
    onOpenChange()
  }

  // Función para enviar los datos del formulario
  const onSubmit = handleSubmit((data) => {
    const uuid = crypto.randomUUID()

    const starsNumber = Number(
      raritys.find((rarity) => rarity.name === data.starsText)?.title[0]
    )

    startTransition(async () => {
      // Si la edición está activa, se envían los datos para actualizar
      if (isEditActive) {
        // UPDATE: Subimos la imagen
        const { url, status, error } = await downloadImage({
          id: id,
          path: 'materials',
          imgFile: image.file
        })

        // Si sale bien continuamos con la actualización
        if (status === 201) {
          const newValues = {
            ...data,
            id: uuid,
            imageUrl: url!,
            stars: starsNumber,
            type: data.type.toLocaleLowerCase(),
            label: data.name,
            value: data.name
          }

          const { message, status, error } = await updateMaterials(
            id,
            newValues
          )

          if (status === 201) {
            toast.success(message)
            handleReset()
            mutate('/api/materials?type=all')
            return
          }

          toast.error(error)
          return
        }

        toast.error(error)
        return
      }

      if (!image.file) {
        toast.error('Debes subir una imagen.')
        return
      }

      // CREATE: Subimos la imagen
      const { url, status, error } = await downloadImage({
        id: uuid,
        path: 'materials',
        imgFile: image.file
      })

      // Si sale bien continuamos con la creación
      if (status === 201) {
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
          mutate('/api/materials?type=all')
          return
        }

        toast.error(error)
        return
      }

      toast.error(`${error} Intentalo denuevo.`)
      return
    })
  })

  return {
    key,
    control,
    errors,
    isPending,
    isEditActive,
    onSubmit,
    handleReset
  }
}
