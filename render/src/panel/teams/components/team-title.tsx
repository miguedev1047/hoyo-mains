import { Input } from '@nextui-org/input'
import { CircularProgress, Tooltip } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { TeamItemType } from '@/render/src/types'
import { useTitle } from '@/render/src/panel/teams/utilities/hooks/use-title'

interface TeamTileProps {
  team: TeamItemType
  children: React.ReactNode
}

const TeamTitle = ({ team, children }: TeamTileProps) => {
  const {
    isEdit,
    isPending,
    control,
    errors,
    handleBlur,
    handleEdit,
    onSubmit
  } = useTitle({ team })

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
          {children}
        </h3>

        {isPending && (
          <CircularProgress size='sm' aria-label='Loading...' strokeWidth={4} />
        )}
      </div>
    </Tooltip>
  )
}

export default TeamTitle
