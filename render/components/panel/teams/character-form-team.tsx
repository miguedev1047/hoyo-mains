'use client'

import { z } from 'zod'
import { CharacterItemSchema } from '@/schemas'
import { Characters } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { InputWrapper } from '@/utils/classes'
import { useTransition } from 'react'
import { createTeam } from '@/render/services/panel/teams/create'
import { toast } from 'sonner'
import { IconPlus } from '@tabler/icons-react'
import { mutate } from 'swr'

const CharacterFormTeam = ({
  character
}: {
  character: Characters | undefined
}) => {
  const [isPending, startTransition] = useTransition()

  const teams = character?.teams
  const MAX_TEAMS = 3
  const TEAM_LENGTH = teams?.length

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
        mutate(`/api/characters/character/${characterId}`)
        reset()
        return
      }

      toast.error(error)
    })
  })

  if (TEAM_LENGTH === MAX_TEAMS) return null

  return (
    <div className='space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        Nuevo Equipo
      </h3>
      <form onSubmit={onSubmit} className='space-y-4'>
        <Controller
          name='items'
          control={control}
          render={({ field }) => (
            <>
              <Input
                label='Nombre del equipo'
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
    </div>
  )
}

export default CharacterFormTeam
