'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { LoginSchema } from '@/schemas'
import { useTransition } from 'react'
import { login } from '@/actions/login/login'
import { toast } from 'sonner'

const LoginForm = () => {
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

      if (status === 200) {
        toast.success(message)
        return
      }

      toast.error(error)
      return
    })
  })

  return (
    <Card className='w-full max-w-[340px] mx-auto p-4 bg-slate-900'>
      <form onSubmit={onSubmit}>
        <CardHeader>
          <h4 className='text-xl font-bold text-color-white'>Iniciar sesión</h4>
        </CardHeader>
        <CardBody className='space-y-4'>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                size='lg'
                type='email'
                label='Correo electrónico'
                placeholder='Correo electrónico'
                isDisabled={isPending}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input
                size='lg'
                type='password'
                label='Contraseña'
                placeholder='Contraseña'
                isDisabled={isPending}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...field}
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Button
            fullWidth
            size='lg'
            type='submit'
            color='danger'
            variant='shadow'
            isLoading={isPending}
            className='bg-color-red font-bold'
          >
            Acceder
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default LoginForm
