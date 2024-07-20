'use client'

import { Button, Input } from '@nextui-org/react'
import { Controller } from 'react-hook-form'
import { CharacterType } from '@/render/src/types'
import { IconPlus } from '@tabler/icons-react'
import { useTeamForm } from '@/render/src/panel/character/teams/utilities/hooks/use-team-form'
import { InputWrapper } from '@/render/src/shared/utilities/classes'

const FormTeam = ({ character }: { character: CharacterType }) => {
  const { isPending, control, errors, FULL_ITEMS, onSubmit } = useTeamForm({
    character
  })

  if (FULL_ITEMS) return null

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <Controller
        name='items'
        control={control}
        render={({ field }) => (
          <>
            <Input
              label='Añadir equipo'
              placeholder='Escribe el nombre del equipo.'
              isInvalid={!!errors.items}
              errorMessage={errors.items?.message}
              classNames={InputWrapper}
              isDisabled={isPending}
              {...field}
            />
          </>
        )}
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
        Añadir Equipo
      </Button>
    </form>
  )
}

export default FormTeam
