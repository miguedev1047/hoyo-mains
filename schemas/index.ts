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
  id: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.'
  }),
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

export const WeaponSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.'
  }),
  type: z.string().min(1, {
    message: 'Selecciona un tipo.'
  }),
  stat: z.string().min(1, {
    message: 'Selecciona una estadistica.'
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.'
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.'
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.'
  })
})

export const ArtifactSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.'
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.'
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.'
  }),
  descTwoPieces: z.string().min(1, {
    message: 'Escribe una descripción válida.'
  }),
  descFourPieces: z.string().min(1, {
    message: 'Escribe una descripción válida.'
  })
})

export const MaterialSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.'
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.'
  }),
  type: z.string().min(1, {
    message: 'Selecciona el tipo de material.'
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.'
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.'
  }),
  label: z.string().min(1, {
    message: 'Campo requerido.'
  }),
  value: z.string().min(1, {
    message: 'Campo requerido.'
  })
})
