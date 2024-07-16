import { z } from 'zod'
import { TeamSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createTeam } from '../services/create'
import { toast } from 'sonner'

export const useTeam = () => {
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

  return {
    isPending,
    control,
    errors,
    onSubmit
  }
}
