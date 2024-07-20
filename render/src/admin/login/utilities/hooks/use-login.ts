import { useTransition } from 'react'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { login } from '@/render/src/admin/login/utilities/services/login'
import { toast } from 'sonner'

export const useLogin = () => {
  const [isPending, startTransition] = useTransition()

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { message, status, error } = await login(data)

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(error)
      return
    })
  })

  return { isPending, control, errors, onSubmit }
}
