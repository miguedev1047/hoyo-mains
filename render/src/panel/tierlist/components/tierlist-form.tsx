'use client'

import { z } from 'zod'
import { InputWrapperDarkest } from '@/render/src/shared/utilities/classes'
import { TierlistSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { IconPlus } from '@tabler/icons-react'
import { useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createTierlist } from '@/render/src/panel/tierlist/utilities/services/create'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const TierlistForm = () => {
  const [isPending, startTransition] = useTransition()
  const {refresh} = useRouter()

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<z.infer<typeof TierlistSchema>>({
    resolver: zodResolver(TierlistSchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { status, message, error } = await createTierlist(data)

      if (status === 201) {
        toast.success(message)
        reset()
        refresh()
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
            classNames={InputWrapperDarkest}
            label='Crear tierlist'
            placeholder='Nombre de la tierlist'
            errorMessage={errors.name?.message}
            isInvalid={!!errors.name}
            isDisabled={isPending}
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

export default TierlistForm
