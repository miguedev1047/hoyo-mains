'use client'

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/render/src/panel/character/shared/components/alert'
import { Button } from '@nextui-org/button'
import { Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useFilteredWeapons } from '@/render/src/panel/character/weapons/utilities/hooks/use-filtered-weapons'
import { useWeaponSelector } from '@/render/src/panel/character/weapons/utilities/hooks/use-weapon-selector'
import { Figure } from '@/render/src/shared/components/figure'
import { selectInputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { CharacterType } from '@/render/src/types'

interface WeaponSelectorProps {
  character: CharacterType
}

const WeaponSelector = ({ character }: WeaponSelectorProps) => {
  const { error, isLoading, weapons } = useFilteredWeapons({ character })

  const {
    FULL_ITEMS,
    defaultKey,
    disabledItems,
    errors,
    isPending,
    control,
    onSubmit
  } = useWeaponSelector({ character })

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
        render={({ field }) => (
          <>
            <Select
              size='lg'
              aria-label='Weapon Selector'
              placeholder='Selecciona las armas'
              selectionMode='multiple'
              className='w-full'
              isMultiline={true}
              key={defaultKey}
              items={weapons ?? []}
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
                    <Chip className='bg-color-dark capitalize px-2 py-1 rounded-md'>
                      {data?.name}
                    </Chip>
                  </div>
                ))
              }}
              {...field}
            >
              {(weapon) => (
                <SelectItem key={weapon.id} textValue={weapon.name}>
                  <div className='flex items-center gap-2'>
                    <Figure size='sm'>
                      <Image
                        className='w-full h-full object-cover'
                        src={weapon.imageUrl!}
                        alt={weapon.name}
                      />
                    </Figure>
                    <span className='capitalize'>{weapon.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </>
        )}
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
        Añadir Armas
      </Button>
    </form>
  )
}

export default WeaponSelector
