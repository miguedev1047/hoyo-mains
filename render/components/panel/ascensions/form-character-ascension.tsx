import { z } from 'zod'
import { createAscension } from '@/render/services/panel/ascensions/create'
import { CharacterAscensionSchema } from '@/schemas'
import { Characters } from '@/types'
import { InputWrapper, selectorItemWrapper } from '@/utils/classes'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import {
  Avatar,
  Button,
  Chip,
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@nextui-org/react'
import { Material } from '@prisma/client'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'

const FormCharacterAscension = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const ascension = character?.ascensions
  const MAX_ITEMS = 6
  const ASCENSION_LENGTH = ascension?.length

  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>('/api/materials', fetcher)

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterAscensionSchema>>({
    resolver: zodResolver(CharacterAscensionSchema),
    defaultValues: {
      rank: '',
      level: '',
      cost: '',
      materials: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    const ascensionId = crypto.randomUUID()

    const materials = data.materials.split(',').map((materialId, index) => ({
      ascensionId: ascensionId,
      materialId: materialId,
      quantity: 0,
      order: index++
    }))

    const MAX_ITEMS = 4
    const MATERIALS_LENGTH = materials?.length

    if (MATERIALS_LENGTH > MAX_ITEMS) {
      return toast.error(`Solo puedes agregar ${MAX_ITEMS} materiales.`)
    }

    if (MATERIALS_LENGTH < 3) {
      return toast.error(`Debes agregar ${MAX_ITEMS} materiales.`)
    }

    startTransition(async () => {
      const { status, message, error } = await createAscension(
        data,
        materials,
        ascensionId,
        character?.id!
      )

      if (status === 201) {
        toast.success(message)
        mutate(`/api/characters/character/${character?.id}`)
        setIsOpen(false)
        reset()
        return
      }

      toast.error(error)
    })
  })

  if (error) return null

  if (isLoading) return null

  if ((ASCENSION_LENGTH ?? 0) >= MAX_ITEMS) return null

  return (
    <Popover
      placement='bottom'
      isOpen={isOpen}
      backdrop='opaque'
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button fullWidth className='bg-color-light font-bold' color='success'>
          Agregar Ascensión
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark max-w-full w-[720px] p-4 rounded-lg'>
        <form onSubmit={onSubmit} className='w-full space-y-2'>
          <h2 className='text-2xl font-semibold text-secondary-color mb-4'>
            Agregar Nivel de Ascensión
          </h2>
          <div className='grid grid-cols-3 gap-2'>
            <Controller
              name='rank'
              control={control}
              render={({ field }) => (
                <Input
                  autoFocus
                  classNames={InputWrapper}
                  isInvalid={!!errors.rank}
                  errorMessage={errors.rank?.message}
                  type='number'
                  label='Rango'
                  placeholder='1'
                  {...field}
                />
              )}
            />

            <Controller
              name='level'
              control={control}
              render={({ field }) => (
                <Input
                  classNames={InputWrapper}
                  isInvalid={!!errors.level}
                  errorMessage={errors.level?.message}
                  type='number'
                  label='Nivel'
                  placeholder='20'
                  {...field}
                />
              )}
            />

            <Controller
              name='cost'
              control={control}
              render={({ field }) => (
                <Input
                  classNames={InputWrapper}
                  isInvalid={!!errors.cost}
                  errorMessage={errors.cost?.message}
                  type='number'
                  label='Costo'
                  placeholder='20000'
                  {...field}
                />
              )}
            />

            <Controller
              name='materials'
              control={control}
              render={({ field }) => (
                <Select
                  label='Materiales'
                  aria-label='Material Selector'
                  placeholder='Selecciona los materiales'
                  selectionMode='multiple'
                  className='col-span-3 w-full'
                  isMultiline={true}
                  items={materials}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  classNames={selectorItemWrapper}
                  onSelectionChange={field.onChange}
                  isInvalid={!!errors.materials}
                  errorMessage={errors.materials?.message}
                  renderValue={(value) => {
                    return value.map(({ data, key }) => (
                      <div key={key} className='flex flex-wrap gap-4'>
                        <Chip className='bg-color-dark px-2 py-1 rounded-md'>
                          {data?.name}
                        </Chip>
                      </div>
                    ))
                  }}
                  {...field}
                >
                  {(material) => (
                    <SelectItem textValue={material.name} key={material.id}>
                      <div className='flex gap-2 items-center'>
                        <Avatar
                          radius='sm'
                          className='p-1'
                          src={material.imageUrl!}
                          alt={material.name}
                        />
                        <span className='line-clamp-1'>{material.name}</span>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />
          </div>

          <Button
            fullWidth
            size='lg'
            color='success'
            type='submit'
            isLoading={isPending}
            className='bg-color-light font-bold'
          >
            Agregar
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default FormCharacterAscension
