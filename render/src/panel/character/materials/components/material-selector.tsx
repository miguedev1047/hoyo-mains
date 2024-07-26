'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import { Button } from '@nextui-org/button'
import { Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { Material } from '@prisma/client'
import { IconPlus } from '@tabler/icons-react'
import { CharacterType } from '@/render/src/types'
import { useMaterialSelector } from '@/render/src/panel/character/materials/utilities/hooks/use-material-selector'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import { selectInputWrapperDarkest } from '@/render/src/shared/utilities/classes'

interface MaterialSelectorProps {
  character: CharacterType
}

const MaterialSelector = ({ character }: MaterialSelectorProps) => {
  const {
    data: materials,
    isLoading,
    error
  } = useFetch<Material[]>('/api/materials')

  const {
    control,
    defaultKey,
    disabledItems,
    errors,
    isPending,
    FULL_ITEMS,
    onSubmit
  } = useMaterialSelector({ character })

  if (error)
    return (
      <Alert variant='error'>
        <AlertTitle>¡Error!</AlertTitle>
        <AlertDescription>
          Ha ocurrido un error inesperado al cargar el selector.
        </AlertDescription>
      </Alert>
    )

  if (FULL_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='space-y-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => {
          return (
            <>
              <Select
                size='lg'
                aria-label='Material Selector'
                placeholder='Selecciona los materiales'
                selectionMode='multiple'
                className='w-full'
                isMultiline={true}
                key={defaultKey}
                items={materials ?? []}
                isLoading={isLoading || isPending}
                isDisabled={isLoading || isPending}
                classNames={selectInputWrapperDarkest}
                disabledKeys={disabledItems}
                onSelectionChange={field.onChange}
                isInvalid={!!errors.items}
                errorMessage={errors.items?.message}
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
                  <SelectItem key={material.id} textValue={material.name}>
                    <div className='flex gap-2 items-center'>
                      <Figure size='sm'>
                        <Image
                          className='w-full h-full object-cover'
                          src={material.imageUrl!}
                          alt={material.name}
                        />
                      </Figure>
                      <span>{material.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </>
          )
        }}
      />

      <Button
        size='lg'
        fullWidth
        startContent={<IconPlus />}
        isLoading={isLoading || isPending}
        isDisabled={isLoading || isPending}
        className='bg-color-light text-color-darkest font-bold'
        type='submit'
      >
        Añadir Materiales
      </Button>
    </form>
  )
}

export default MaterialSelector
