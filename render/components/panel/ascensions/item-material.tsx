import { z } from 'zod'
import { AscensionQuantitySchema } from '@/schemas'
import { MaterialByAscension } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button
} from '@nextui-org/react'
import { Material } from '@prisma/client'
import { IconCheck } from '@tabler/icons-react'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputWrapper } from '@/utils/classes'
import { updateQuantityAscensionMaterial } from '@/render/services/panel/ascensions/update'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

const ItemMaterial = ({
  material,
  characterId
}: {
  material: MaterialByAscension
  characterId: string | undefined
}) => {
  const [isPending, startTransition] = useTransition()

  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.materialId}`, fetcher)

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    control
  } = useForm<z.infer<typeof AscensionQuantitySchema>>({
    resolver: zodResolver(AscensionQuantitySchema),
    defaultValues: {
      quantity: material.quantity.toString(),
      id: material.id
    }
  })

  const onSubmit = handleSubmit((data) => {
    const quantity = parseInt(data.quantity)
    const quantiyId = data.id

    startTransition(async () => {
      const { status, message, error } = await updateQuantityAscensionMaterial(
        quantiyId,
        quantity
      )

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character/${characterId}`)
        return
      }

      toast.error(error)
    })
  })

  if (isLoading) return null
  if (error) return null

  return (
    <Popover placement='bottom'>
      <PopoverTrigger>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Badge placement='top-left' content={material.quantity}>
            <Avatar
              radius='sm'
              className='p-1'
              src={dataMaterial?.imageUrl!}
              alt={dataMaterial?.name}
            />
          </Badge>
          {dataMaterial?.name}
        </div>
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark p-2 rounded-md'>
        <div>
          <form onSubmit={onSubmit} className='flex gap-2 items-center'>
            <Controller
              control={control}
              name='quantity'
              render={({ field }) => (
                <Input
                  label='Cantidad'
                  placeholder='Cantidad de material'
                  type='number'
                  size='sm'
                  isDisabled={isPending}
                  isInvalid={!!errors.quantity}
                  errorMessage={errors.quantity?.message}
                  classNames={InputWrapper}
                  {...field}
                />
              )}
            />
            <Button
              isIconOnly
              type='submit'
              color='success'
              isLoading={isPending}
              className='bg-color-light'
            >
              <IconCheck />
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ItemMaterial
