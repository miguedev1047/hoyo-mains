import { z } from 'zod'
import { createWeaponCharacters } from '@/render/services/panel/weapons/create'
import { CharacterItemSchema } from '@/schemas'
import { Characters } from '@/types'
import { selectorItemWrapper } from '@/utils/classes'
import { fetcher } from '@/utils/helpers/fetcher'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Avatar, Chip, Select, SelectItem } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { CharacterItemError } from '@/render/components/UI/errors/character-error'
import useSWR, { mutate } from 'swr'

const WeaponSelector = ({
  character
}: {
  character: Characters | undefined
}) => {
  const {
    data: weapons,
    isLoading,
    error
  } = useSWR<Weapon[]>('/api/weapons', fetcher)

  const filteredWeapons = weapons?.filter(
    (item) => item.type === character?.weapon
  )

  const allMaterials = character?.weapons
  const disabledItems = allMaterials?.map((item) => item.item)
  const MAX_ITEMS = 5

  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterItemSchema>>({
    resolver: zodResolver(CharacterItemSchema),
    defaultValues: {
      items: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    const newWeapons = data.items.split(',').map((item: string, index) => ({
      item: item,
      characterId: character?.id,
      order: index++
    }))

    const CURRENT_ITEMS = [...allMaterials!, ...newWeapons]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} materiales.`)

    startTransition(async () => {
      const { status, message, error } = await createWeaponCharacters(
        newWeapons
      )

      if (status === 201) {
        reset()
        mutate(`/api/characters/character/${character?.id}`)
        toast.success(message)
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  if (error)
    return <CharacterItemError message='No se ha podido cargar el selector.' />

  if (isLoading) return null

  if (allMaterials?.length === MAX_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='space-y-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => (
          <>
            <Select
              aria-label='Weapon Selector'
              placeholder='Selecciona las armas'
              selectionMode='multiple'
              className='w-full'
              isMultiline={true}
              key={defaultKey}
              items={filteredWeapons}
              isLoading={isLoading}
              isDisabled={isLoading}
              classNames={selectorItemWrapper}
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
                  <div className='flex gap-2 items-center'>
                    <Avatar
                      radius='sm'
                      className='p-1 object-cover'
                      src={weapon.imageUrl!}
                      alt={weapon.name}
                    />
                    <span>{weapon.name}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </>
        )}
      />

      <Button
        fullWidth
        isDisabled={isLoading}
        isLoading={isPending}
        className='bg-color-light text-color-darkest font-bold'
        type='submit'
      >
        Añadir Armas
      </Button>
    </form>
  )
}

export default WeaponSelector
