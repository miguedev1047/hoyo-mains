import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AscensionQuantitySchema } from '@/schemas'
import { MaterialByAscension } from '@prisma/client'
import { updateQuantity } from '@/render/src/panel/character/ascension/services/update'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface QuantityFormProps {
  material: MaterialByAscension
}

export const useAscensionQuantity = ({ material }: QuantityFormProps) => {
  const materialId = material?.id!

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm<z.infer<typeof AscensionQuantitySchema>>({
    resolver: zodResolver(AscensionQuantitySchema),
    defaultValues: {
      quantity: material.quantity.toString(),
      id: materialId
    }
  })

  const onSubmit = handleSubmit((data) => {
    const quantity = parseInt(data.quantity)
    const quantiyId = data.id

    startTransition(async () => {
      const { status, message, error } = await updateQuantity(
        quantiyId,
        quantity
      )

      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    errors,
    control,
    onSubmit
  }
}
