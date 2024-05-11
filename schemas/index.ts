import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Escribe un correo electrónico válido'
  }),
  password: z.string().min(8, {
    message: 'Escribe una contraseña válida'
  })
})
