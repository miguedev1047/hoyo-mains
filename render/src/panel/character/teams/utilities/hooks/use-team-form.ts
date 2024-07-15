import { z } from 'zod'
import { CharacterType } from '@/render/src/types'
import { CharacterItemSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createTeam } from '@/render/src/panel/character/teams/utilities/services/create'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface TeamProps {
  character: CharacterType
}

export const useTeamForm = ({ character }: TeamProps) => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const teams = character?.teams

  const MAX_TEAMS = 3
  const TEAM_LENGTH = teams?.length
  const FULL_ITEMS = TEAM_LENGTH >= MAX_TEAMS

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
    startTransition(async () => {
      const characterId = character?.id!
      const { status, message, error } = await createTeam(data, characterId)

      if (status === 201) {
        toast.success(message)
        refresh()
        reset()
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    control,
    errors,
    FULL_ITEMS,
    onSubmit
  }
}
