import { z } from 'zod'
import { AscensionQuantitySchema } from '@/schemas'
import { Characters, MaterialByAscension } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  Image
} from '@nextui-org/react'
import { Material } from '@prisma/client'
import { IconCheck } from '@tabler/icons-react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { InputWrapper } from '@/utils/classes'
import { updateQuantityAscensionMaterial } from '@/render/services/panel/ascensions/update'
import { toast } from 'sonner'
import { PanelSkeletonTeamCharacters } from '@/render/components/UI/skeletons'
import Figure from '@/render/components/UI/misc/figure'
import useSWR, { mutate } from 'swr'

const ItemMaterial = ({
  material,
  character
}: {
  material: MaterialByAscension
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')

  const {
    data: dataMaterial,
    isLoading,
    error
  } = useSWR<Material>(`/api/materials/${material.materialId}`, fetcher)

  const {
    handleSubmit,
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
        mutate(`/api/characters/character?name=${characterName}`)
        setIsOpen(false)
        return
      }

      toast.error(error)
    })
  })

  if (isLoading) return <PanelSkeletonTeamCharacters />
  if (error) return null

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
      placement='bottom'
    >
      <PopoverTrigger>
        <div className='flex items-center gap-2 cursor-pointer'>
          <Badge placement='top-left' content={material.quantity}>
            <Figure width='w-10' height='h-10'>
              <Image
                radius='sm'
                className='w-full h-full object-cover'
                src={dataMaterial?.imageUrl!}
                alt={dataMaterial?.name}
              />
            </Figure>
          </Badge>
          <h3 className='text-xs line-clamp-1'>{dataMaterial?.name}</h3>
        </div>
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark p-3'>
        <div>
          <form onSubmit={onSubmit} className='flex gap-2 items-center'>
            <Controller
              control={control}
              name='quantity'
              render={({ field }) => (
                <Input
                  autoFocus
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
