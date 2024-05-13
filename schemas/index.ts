import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Escribe un correo electrónico válido'
  }),
  password: z.string().min(8, {
    message: 'Escribe una contraseña válida'
  })
})

export const CharacterSchema = z.object({
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.'
  }),
  element: z.string().min(1, {
    message: 'Selecciona un elemento.'
  }),
  role: z.string().min(1, {
    message: 'Selecciona un rol.'
  }),
  weapon: z.string().min(1, {
    message: 'Selecciona un arma.'
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.'
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.'
  })
})
