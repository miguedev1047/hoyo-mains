import { z } from 'zod'
import { updateNameTeam } from '@/render/services/panel/teams/general-teams/update'
import { TeamSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { Button, CircularProgress, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { IconTrash } from '@tabler/icons-react'
import { deleteTeam } from '@/render/services/panel/teams/general-teams/delete'

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

const DeleteButton = ({ team }: { team: any }) => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const handleDelete = (teamId: string) => {
    startTransition(async () => {
      const { status, message, error } = await deleteTeam(teamId)
      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }
      toast.error(error)
    })
  }

  return (
    <Button
      size='sm'
      isIconOnly
      color='danger'
      onPress={() => handleDelete(team.id)}
      className='bg-color-red'
      isLoading={isPending}
    >
      <IconTrash />
    </Button>
  )
}

const TeamTitle = ({ team }: { team: any }) => {
  const {
    isPending,
    isEdit,
    teamName,
    control,
    errors,
    handleEdit,
    handleBlur,
    onSubmit
  } = useTitle(team)

  if (isEdit) {
    return (
      <form onSubmit={onSubmit}>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <Input
              autoFocus
              size='sm'
              isDisabled={isPending}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              onBlur={handleBlur}
              variant='underlined'
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </form>
    )
  }

  return (
    <div className='flex space-x-3'>
      <DeleteButton team={team} />
      <Tooltip
        className='bg-color-light text-color-darkest'
        content={<p>Haz doble click para editar el nombre</p>}
      >
        <article className='flex items-center gap-4'>
          <h3
            onDoubleClick={handleEdit}
            onBlur={handleEdit}
            className='text-lg font-semibold capitalize'
          >
            {teamName}
          </h3>

          {isPending && (
            <CircularProgress
              size='sm'
              aria-label='Loading...'
              strokeWidth={4}
            />
          )}
        </article>
      </Tooltip>
    </div>
  )
}

export default TeamTitle
