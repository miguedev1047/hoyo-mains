'use client'

import { CharacterType } from '@/render/src/types'
import {
  Button,
  Chip,
  Image,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem
} from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useAscensionForm } from '@/render/src/panel/character/ascension/utilities/hooks/use-ascension-form'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Material } from '@prisma/client'
import {
  InputWrapper,
  selectWrapperDark
} from '@/render/src/shared/utilities/classes'
import Figure from '@/render/src/shared/components/figure'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'

interface AscensionFormProps {
  character: CharacterType
}

const AscensionForm = ({ character }: AscensionFormProps) => {
  const {
    data: materials,
    isLoading,
    error
  } = useFetch<Material[]>('/api/materials')

  const {
    isOpen,
    isPending,
    FULL_ITEMS,
    control,
    errors,
    onSubmit,
    setIsOpen
  } = useAscensionForm({ character })

  if (error)
    return (
      <Alert variant='error'>
        <AlertTitle>¡Error!</AlertTitle>
        <AlertDescription>Ha ocurrido un error inesperado.</AlertDescription>
      </Alert>
    )

  if (isLoading) return null
  
  if (FULL_ITEMS) return null

  return (
    <Popover
      placement='bottom'
      isOpen={isOpen}
      backdrop='opaque'
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        <Button
          size='lg'
          fullWidth
          startContent={<IconPlus />}
          color='success'
          className='bg-color-light font-bold'
        >
          Agregar Ascensión
        </Button>
      </PopoverTrigger>
      <PopoverContent className='bg-color-dark max-w-full w-[720px] p-4 rounded-lg'>
        <form onSubmit={onSubmit} className='w-full space-y-2'>
          <h2 className='text-2xl font-semibold text-secondary-color mb-4'>
            Agregar Nivel de Ascensión
          </h2>
          <div className='grid grid-cols-2 gap-2'>
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
                  className='col-span-2 w-full'
                  isMultiline={true}
                  items={materials}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  classNames={selectWrapperDark}
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
                        <Figure width='w-10' height='h-10'>
                          <Image
                            radius='sm'
                            className='w-full h-full object-cover'
                            src={material.imageUrl!}
                            alt={material.name}
                          />
                        </Figure>
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

export default AscensionForm
