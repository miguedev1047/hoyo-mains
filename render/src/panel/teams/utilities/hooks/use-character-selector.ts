import { z } from 'zod'
import { TeamItemType } from '@/render/src/types'
import { ItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createCharacters } from '../services/create'

interface CharacterSelectorProps {
  team: TeamItemType
}

export const useCharacterSelector = ({ team }: CharacterSelectorProps) => {
  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()
  const [defaultKey, setKey] = useState<string>('default-key')

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

  const allCharacters = team.characters
  const disabledItems = team.characters?.map((item) => item.characterItem!)

  const MAX_ITEMS = 4
  const FULL_ITEMS = allCharacters?.length >= MAX_ITEMS

  const onSubmit = handleSubmit((data) => {
    const teamId = team?.id

    const selectedCharacters = data.items
      .split(',')
      .map((itemId: string, index) => ({
        teamId: teamId,
        characterId: itemId,
        order: index++
      }))

    const CURRENT_ITEMS = [...allCharacters!, ...selectedCharacters]
    if (CURRENT_ITEMS.length > MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_ITEMS} personajes.`)

    startTransition(async () => {
      const { status, message, error } = await createCharacters(
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

  return {
    control,
    errors,
    isPending,
    defaultKey,
    disabledItems,
    FULL_ITEMS,
    onSubmit
  }
}
