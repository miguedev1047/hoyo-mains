'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { Controller } from 'react-hook-form'
import { useTeam } from '@/render/src/panel/teams/utilities/hooks/use-team-'
import { InputWrapper } from '@/render/src/shared/utilities/classes'

const TeamForm = () => {
  const { control, errors, isPending, onSubmit } = useTeam()

  return (
    <form className='flex items-center gap-2' onSubmit={onSubmit}>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <Input
            size='lg'
            className='w-full'
            placeholder='Nombre del equipo'
            label='Crear equipo'
            isDisabled={isPending}
            classNames={InputWrapper}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
            {...field}
          />
        )}
      />
      <Button
        size='lg'
        isIconOnly
        type='submit'
        isLoading={isPending}
        className='bg-color-lightest'
      >
        <IconPlus size={24} className='text-color-darkest' />
      </Button>
    </form>
  )
}

export default TeamForm
