'use client'

import { z } from 'zod'
import { createTeam } from '@/render/services/panel/teams/best-teams/create'
import { TeamSchema } from '@/schemas'
import { InputWrapper } from '@/utils/classes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const BestTeamForm = () => {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status, message, error } = await createTeam(data)

      if (status === 201) {
        reset()
        refresh()
        toast.success(message)
        return
      }

      toast.error(error)
    })
  })

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

export default BestTeamForm
