import { z } from 'zod'
import { TeamItemType } from '@/render/src/types'
import { CharacterTeamSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { updateTeamName } from '../services/update'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface TileProps {
  team: TeamItemType
}

export const useTitle = ({ team }: TileProps) => {
  const [isPending, startTransition] = useTransition()
  const [isEdit, setIsEdit] = useState(false)
  const { refresh } = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof CharacterTeamSchema>>({
    resolver: zodResolver(CharacterTeamSchema),
    defaultValues: {
      name: team.name
    }
  })

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleBlur = () => {
    setIsEdit(false)
  }

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const teamId = team.id
      const { status, message, error } = await updateTeamName(teamId, data)

      if (status === 201) {
        setIsEdit(false)
        refresh()
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

  return {
    isEdit,
    isPending,
    control,
    errors,
    handleEdit,
    handleBlur,
    onSubmit
  }
}
