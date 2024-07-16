'use client'

import { Artifact } from '@prisma/client'
import { Controller } from 'react-hook-form'
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { selectorItemWrapper } from '@/utils/classes'
import { IconPlus } from '@tabler/icons-react'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import { useArtifactSelector } from '@/render/src/panel/character/artifacts/utilities/hooks/use-artifact-selector'
import { CharacterType } from '@/render/src/types'
import { Figure } from '@/render/src/shared/components/figure'

interface ArtifactSelectorProps {
  character: CharacterType
}

const ArtifactSelector = ({ character }: ArtifactSelectorProps) => {
  const {
    data: artifacts,
    isLoading,
    error
  } = useFetch<Artifact[]>('/api/artifacts')

  const {
    FULL_ITEMS,
    control,
    defaultKey,
    disabledItems,
    errors,
    isPending,
    onSubmit
  } = useArtifactSelector({ character })

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
                aria-label='Artifact Selector'
                placeholder='Selecciona los artefactos'
                selectionMode='multiple'
                className='w-full'
                isMultiline={true}
                key={defaultKey}
                items={artifacts ?? []}
                isDisabled={isLoading || isPending}
                isLoading={isLoading || isPending}
                classNames={selectorItemWrapper}
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
                {(artifact) => (
                  <SelectItem key={artifact.id} textValue={artifact.name}>
                    <div className='flex gap-2 items-center'>
                      <Figure size='sm'>
                        <Image
                          radius='sm'
                          className='w-full h-full object-cover'
                          src={artifact.imageUrl!}
                          alt={artifact.name}
                        />
                      </Figure>
                      <span>{artifact.name}</span>
                    </div>
                  </SelectItem>
                )}
              </Select>
            </>
          )
        }}
      />

      <Button
        fullWidth
        startContent={<IconPlus />}
        isDisabled={isLoading || isPending}
        isLoading={isLoading || isPending}
        className='bg-color-light text-color-darkest font-bold'
        type='submit'
        size='lg'
      >
        Añadir Artefactos
      </Button>
    </form>
  )
}

export default ArtifactSelector
