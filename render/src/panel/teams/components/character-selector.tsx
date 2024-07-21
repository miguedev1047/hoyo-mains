'use client'

import { selectInputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { CharacterType, TeamItemType } from '@/render/src/types'
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useCharacterSelector } from '@/render/src/panel/teams/utilities/hooks/use-character-selector'
import { Figure } from '@/render/src/shared/components/figure'

interface CharacterSelectorTypes {
  characters: CharacterType[]
  team: TeamItemType
}

const CharacterSelector = ({ characters, team }: CharacterSelectorTypes) => {
  const {
    isPending,
    errors,
    control,
    defaultKey,
    disabledItems,
    FULL_ITEMS,
    onSubmit
  } = useCharacterSelector({ team })

  if (FULL_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='flex items-center gap-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => (
          <Select
            size='lg'
            items={characters ?? []}
            className='w-full'
            isMultiline={true}
            key={defaultKey}
            selectionMode='multiple'
            aria-label='Character Selector'
            placeholder='Selecciona los personajes'
            isLoading={isPending}
            isDisabled={isPending || FULL_ITEMS}
            onSelectionChange={field.onChange}
            classNames={selectInputWrapperDarkest}
            disabledKeys={disabledItems}
            isInvalid={!!errors.items}
            errorMessage={errors.items?.message}
            renderValue={(value) => {
              return value.map(({ data, key }) => (
                <div key={key} className='flex flex-wrap items-center gap-2'>
                  <Chip className='bg-color-dark capitalize px-2 py-1 rounded-md'>
                    {data?.name}
                  </Chip>
                </div>
              ))
            }}
            {...field}
          >
            {(character: any) => (
              <SelectItem
                textValue={character.id}
                key={character.id}
                value={character.id}
              >
                <div className='flex items-center gap-4'>
                  <Figure>
                    <Image
                      radius='sm'
                      src={character?.imageUrl!}
                      alt={character?.name}
                      className='w-full h-full object-cover'
                    />
                  </Figure>
                  <h2 className='capitalize'>{character.name}</h2>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
      <Button size='lg' isIconOnly type='submit' className='bg-color-light'>
        <IconPlus className='text-color-darkest' size={24} />
      </Button>
    </form>
  )
}

export default CharacterSelector
