'use client'

import { useTransition } from 'react'
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/schemas'
import { login } from './utilities/services/login'
import { toast } from 'sonner'
import {
  InputWrapper,
  InputWrapperDarkest
} from '../../shared/utilities/classes'

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

      if (status === 201) {
        toast.success(message)
        return
      }

      toast.error(error)
      return
    })
  })

  return (
    <div className='w-full h-full max-w-1/2 flex items-center'>
      <Card className='w-full max-w-[640px] mx-auto p-4 bg-transparent shadow-none'>
        <form onSubmit={onSubmit}>
          <CardHeader className='flex flex-col space-y-4'>
            <h2 className='text-4xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-color-lightest to-gray-400'>
              Hoyo Panel
            </h2>
            <h4 className='text-lg font-normal text-center text-color-lightest'>
              Accede a tu cuenta con tu correo electrónico y contraseña.
            </h4>
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
                  placeholder='Introduce tu correo electrónico'
                  isDisabled={isPending}
                  isInvalid={!!errors.email}
                  classNames={InputWrapperDarkest}
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
                  placeholder='Introduce tu contraseña'
                  isDisabled={isPending}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message}
                  classNames={InputWrapperDarkest}
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
              color='success'
              isLoading={isPending}
              isDisabled={isPending}
              className='bg-color-light uppercase font-bold'
            >
              Acceder
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginForm
