'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterConstellationSchema } from '@/schemas'
import db from '@/libs/db'

export const createContellation = async (
  data: z.infer<typeof CharacterConstellationSchema>,
  characterId: string | undefined
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterConstellationSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { id, name, description } = validateFields.data

  try {
    const passives = await db.constellationsByCharacter.create({
      data: {
        id,
        characterId,
        name,
        description
      }
    })

    return { data: passives, message: 'Constelación creada!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al crear la constelación.', status: 500 }
  }
}
