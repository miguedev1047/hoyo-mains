import { z } from 'zod'
import { TeamSchema } from '@/schemas'
import { updateNameTeam } from '@/render/services/panel/teams/best-teams/update'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const useTitle = (team: any) => {
  const [isPending, startTransition] = useTransition()
  const [isEdit, setIsEdit] = useState(false)
  const { refresh } = useRouter()

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: team?.name
    }
  })

  const teamName = getValues('name')

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleBlur = () => {
    setIsEdit(false)
  }

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const teamId = team.id
      const { status, message, error } = await updateNameTeam(teamId, data)

      if (status === 201) {
        setIsEdit(false)
        toast.success(message)
        refresh()
        return
      }

      toast.error(error)
    })
  })

  return {
    isPending,
    isEdit,
    teamName,
    control,
    errors,
    handleEdit,
    handleBlur,
    onSubmit
  }
}

export default useTitle
