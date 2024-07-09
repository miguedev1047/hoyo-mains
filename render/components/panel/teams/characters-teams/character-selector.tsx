import { z } from 'zod'
import { CharacterTypes, Team } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CharacterItemSchema } from '@/schemas'
import { createCharactersCharacter } from '@/render/services/panel/teams/character-teams/create'
import {
  Button,
  Chip,
  Image,
  Select,
  SelectItem
} from '@nextui-org/react'
import { selectorItemDarkwrapper } from '@/utils/classes'
import { Character } from '@prisma/client'
import { IconPlus } from '@tabler/icons-react'
import { HomeErrorItem } from '@/render/components/UI/errors'
import { toast } from 'sonner'
import useSWR, { mutate } from 'swr'
import Figure from '@/render/components/UI/misc/figure'

const CharacterSelector = ({
  character,
  team
}: {
  character: CharacterTypes | undefined
  team: Team
}) => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters', fetcher)

  const characterId = character?.id
  const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
  const allCharacters = team.characters
  const disabledItems = team.characters?.map((item) => item.characterId!)

  const MAX_ITEMS = 4

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
    const teamId = team?.id
    const newCharacters = data.items
      .split(',')
      .map((itemId: string, index) => ({
        teamId: teamId,
        characterItem: itemId,
        characterId: characterId,
        order: index++
      }))

    const CURRENT_ITEMS = [...allCharacters!, ...newCharacters]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} personajes.`)

    startTransition(async () => {
      const { status, message, error } = await createCharactersCharacter(
        newCharacters
      )

      if (status === 201) {
        reset()
        mutate(`/api/characters/character?name=${characterName}`)
        toast.success(message)
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  if (error) return <HomeErrorItem />
  if (isLoading) return null

  if ((allCharacters?.length ?? 0) >= MAX_ITEMS) return null

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
              items={characters}
              isLoading={isLoading}
              isDisabled={isLoading}
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
                    <Figure padding='p-0' width='w-10' height='h-10'>
                      <Image
                        radius='sm'
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
        isLoading={isPending}
        className='bg-color-light font-bold'
      >
        Añadir Personajes
      </Button>
    </form>
  )
}

export default CharacterSelector
