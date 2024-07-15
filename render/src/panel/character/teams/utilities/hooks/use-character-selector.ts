import { z } from 'zod'
import { CharacterType, TeamItemType } from '@/render/src/types'
import { CharacterItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createCharacter } from '@/render/src/panel/character/teams/utilities/services/create'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface CharacterSelectorProps {
  character: CharacterType
  team: TeamItemType
}

export const useCharacterSelector = ({
  character,
  team
}: CharacterSelectorProps) => {
  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')
  const { refresh } = useRouter()

  const characterId = character?.id
  const allCharacters = team.characters
  const disabledItems = team.characters?.map((item) => item.characterItem!)

  const MAX_ITEMS = 4
  const FULL_ITEMS = allCharacters?.length >= MAX_ITEMS

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

    const selectedCharacters = data.items
      .split(',')
      .map((itemId: string, index) => ({
        teamId: teamId,
        characterItem: itemId,
        characterId: characterId,
        order: index++
      }))

    const CURRENT_ITEMS = [...allCharacters!, ...selectedCharacters]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} personajes.`)

    startTransition(async () => {
      const { status, message, error } = await createCharacter(
        selectedCharacters
      )

      if (status === 201) {
        reset()
        refresh()
        toast.success(message)
        handleGenerateKey()
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    defaultKey,
    control,
    errors,
    disabledItems,
    FULL_ITEMS,
    onSubmit
  }
}
