'use client'

import { z } from 'zod'
import { createMembersTeam } from '@/render/services/panel/teams/general-teams/create'
import { ItemSchema } from '@/schemas'
import { selectInputWrapper } from '@/utils/classes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Chip, Image, Select, SelectItem } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Figure from '@/render/components/UI/misc/figure'

const CharacterSelector = ({
  characters,
  team
}: {
  characters: any
  team: any
}) => {
  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')

  const { refresh } = useRouter()

  const MAX_ITEMS = 4

  const teamMembers = team.characters
  const teamItems = team.characters?.map((item: any) => item.characterId!)
  const maxTeamMembers = teamItems.length === MAX_ITEMS

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      items: ''
    }
  })

  const handleGenerateKey = () => {
    setKey(crypto.randomUUID())
  }

  const onSubmit = handleSubmit((data) => {
    const teamId = team?.id
    const selectedCharacters = data.items
      .split(',')
      .map((itemId: string, index) => ({
        teamId: teamId,
        characterId: itemId,
        order: index++
      }))

    const CURRENT_ITEMS = [...teamMembers!, ...selectedCharacters]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} personajes.`)

    startTransition(async () => {
      const { status, message, error } = await createMembersTeam(
        selectedCharacters
      )

      if (status === 201) {
        toast.success(message)
        refresh()
        reset()
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  if (maxTeamMembers) return null

  return (
    <form onSubmit={onSubmit} className='flex items-center gap-2'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => (
          <Select
            size='lg'
            items={characters}
            className='w-full'
            isMultiline={true}
            key={defaultKey}
            selectionMode='multiple'
            aria-label='Character Selector'
            placeholder='Selecciona los personajes'
            isLoading={isPending}
            isDisabled={isPending || maxTeamMembers}
            onSelectionChange={field.onChange}
            classNames={selectInputWrapper}
            disabledKeys={teamItems}
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
                <div className='flex items-center gap-2'>
                  <Figure width='w-10' height='h-10'>
                    <Image
                      radius='sm'
                      src={character?.imageUrl!}
                      alt={character?.name}
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
