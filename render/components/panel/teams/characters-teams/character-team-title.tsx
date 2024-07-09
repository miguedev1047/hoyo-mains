import { z } from 'zod'
import { updateNameTeam } from '@/render/services/panel/teams/character-teams/update'
import { CharacterTeamSchema } from '@/schemas'
import { CharacterTypes, Team } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { mutate } from 'swr'

const CharacterTeamTitle = ({
  team,
  character
}: {
  team: Team
  character: CharacterTypes | undefined
}) => {
  const [isPending, startTransition] = useTransition()
  const [isEdit, setIsEdit] = useState(false)

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
      const characterName = character?.name.toLowerCase().replace(/\s/g, '-')
      const { status, message, error } = await updateNameTeam(teamId, data)

      if (status === 201) {
        setIsEdit(false)
        toast.success(message)
        mutate(`/api/characters/character?name=${characterName}`)
        return
      }

      toast.error(error)
    })
  })

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
    <Tooltip
      className='bg-color-light text-color-darkest'
      content={<p>Haz doble click para editar el nombre</p>}
    >
      <div className='flex items-center gap-4'>
        <h3
          onDoubleClick={handleEdit}
          onBlur={handleEdit}
          className='text-lg font-semibold capitalize'
        >
          {team?.name}
        </h3>

        {isPending && (
          <CircularProgress size='sm' aria-label='Loading...' strokeWidth={4} />
        )}
      </div>
    </Tooltip>
  )
}

export default CharacterTeamTitle
