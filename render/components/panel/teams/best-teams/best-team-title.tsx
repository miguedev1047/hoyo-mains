import { Input } from '@nextui-org/input'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { IconTrash } from '@tabler/icons-react'
import { deleteTeam } from '@/render/services/panel/teams/best-teams/delete'
import { DeleteButton } from '@/render/components/UI/buttons/delete/delete-button'
import useTitle from '@/utils/hooks/panel/best-teams/use-title'

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
              size='lg'
              autoFocus
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
      <DeleteButton id={team.id} onCallback={deleteTeam}>
        <IconTrash size={20} />
      </DeleteButton>
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
