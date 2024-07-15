'use client'

import { CharacterType, TeamItemType } from '@/render/src/types'
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { selectorItemDarkwrapper } from '@/utils/classes'
import { Character } from '@prisma/client'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { useCharacterSelector } from '@/render/src/panel/character/teams/utilities/hooks/use-character-selector'
import Figure from '@/render/src/shared/components/figure'

interface CharacterSelectorProps {
  character: CharacterType
  team: TeamItemType
}

const CharacterSelector = ({ character, team }: CharacterSelectorProps) => {
  const {
    data: characters,
    isLoading,
    error
  } = useFetch<Character[]>('/api/characters')

  const {
    isPending,
    defaultKey,
    control,
    errors,
    disabledItems,
    FULL_ITEMS,
    onSubmit
  } = useCharacterSelector({ character, team })

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
    <form onSubmit={onSubmit} className='space-y-4'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => {
          return (
            <Select
              aria-label='Character Selector'
              placeholder='Selecciona los personajes'
              selectionMode='multiple'
              className='w-full'
              isMultiline={true}
              key={defaultKey}
              items={characters ?? []}
              isDisabled={isLoading || isPending}
              isLoading={isLoading || isPending}
              classNames={selectorItemDarkwrapper}
              disabledKeys={disabledItems}
              onSelectionChange={field.onChange}
              isInvalid={!!errors.items}
              errorMessage={errors.items?.message}
              renderValue={(value) => {
                return value.map(({ data, key }) => (
                  <div key={key} className='flex flex-wrap items-center gap-2'>
                    <Chip className='bg-color-darkest capitalize px-2 py-1 rounded-md'>
                      {data?.name}
                    </Chip>
                  </div>
                ))
              }}
              {...field}
            >
              {(character) => (
                <SelectItem key={character.id} textValue={character.name}>
                  <div className='flex items-center gap-2'>
                    <Figure
                      background='bg-primary-color'
                      width='w-10'
                      height='h-10'
                    >
                      <Image
                        className='w-full h-full object-cover'
                        src={character.imageUrl!}
                        alt={character.name}
                      />
                    </Figure>
                    <span className='capitalize'>{character.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          )
        }}
      />

      <Button
        fullWidth
        size='lg'
        type='submit'
        color='success'
        startContent={<IconPlus />}
        isDisabled={isLoading || isPending}
        isLoading={isLoading || isPending}
        className='bg-color-light font-bold'
      >
        Añadir Personajes
      </Button>
    </form>
  )
}

export default CharacterSelector
