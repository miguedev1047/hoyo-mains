import z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Escribe un correo electrónico válido!',
  }),
  password: z.string().min(8, {
    message: 'Escribe una contraseña válida!',
  }),
})

export const CharacterSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  element: z.string().min(1, {
    message: 'Selecciona un elemento.',
  }),
  role: z.string().min(1, {
    message: 'Selecciona un rol.',
  }),
  weapon: z.string().min(1, {
    message: 'Selecciona un arma.',
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.',
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.',
  }),
})

export const TeamSchema = z.object({
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
})

export const ItemSchema = z.object({
  items: z
    .string()
    .min(1, {
      message: 'Selecciona al menos un elemento.',
    })
    .optional(),
})

export const WeaponSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  type: z.string().min(1, {
    message: 'Selecciona un tipo.',
  }),
  stat: z.string().min(1, {
    message: 'Selecciona una estadistica.',
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.',
  }),
  atk: z.string().min(1, {
    message: 'Establece el ataque básico del arna.',
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
})

export const ArtifactSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.',
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
})

export const MaterialSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
  type: z.string().min(1, {
    message: 'Selecciona el tipo de material.',
  }),
  stars: z.number().int().min(0, {
    message: 'Selecciona una rareza.',
  }),
  starsText: z.string().min(1, {
    message: 'Selecciona una rareza.',
  }),
  label: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  value: z.string().min(1, {
    message: 'Campo requerido.',
  }),
})

export const CharacterItemSchema = z.object({
  items: z.string().min(1, {
    message: 'Selecciona al menos un elemento.',
  }),
})

export const CharacterTeamSchema = z.object({
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
})

export const CharacterBestStatsSchema = z.object({
  sandStat: z.string().min(1, {
    message: 'Estadistica requerida.',
  }),
  globetStat: z.string().min(1, {
    message: 'Estadistica requerida.',
  }),
  circletStat: z.string().min(1, {
    message: 'Estadistica requerida.',
  }),
  substatPriority: z.string().min(1, {
    message: 'Estadistica secundarias requerida.',
  }),
})

export const CharacterYoutubeSchema = z.object({
  youtuberName: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  youtuberChannel: z.string().min(1, {
    message: 'Escribe una URL válida.',
  }),
  embedVideoUrl: z.string().min(1, {
    message: 'Escribe una URL válida.',
  }),
})

export const CharacterTalentSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
})

export const CharactersPassiveSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
})

export const CharacterConstellationSchema = z.object({
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  imageUrl: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
  description: z.string().min(1, {
    message: 'Escribe una descripción válida.',
  }),
})

export const CharacterAscensionSchema = z.object({
  level: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  cost: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  materials: z.string().min(1, {
    message: 'Selecciona al menos un material.',
  }),
})

export const AscensionQuantitySchema = z.object({
  quantity: z.string().min(1, {
    message: 'Campo requerido.',
  }),
  id: z.string().min(1, {
    message: 'Campo requerido.',
  }),
})

export const CharacterConfigurationSchema = z.object({
  public: z.boolean(),
  isNew: z.boolean(),
})

export const TierlistSchema = z.object({
  name: z.string().min(1, {
    message: 'Escribe un nombre válido.',
  }),
})