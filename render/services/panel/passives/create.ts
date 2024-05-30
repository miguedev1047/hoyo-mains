'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharactersPassiveSchema } from '@/schemas'
import db from '@/libs/db'

export const createPassives = async (
  data: z.infer<typeof CharactersPassiveSchema>,
  characterId: string | undefined
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharactersPassiveSchema.safeParse(data)

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { id, imageUrl, name, description } = validateFields.data

  try {
    const passives = await db.passivesByCharacter.create({
      data: {
        id,
        imageUrl,
        characterId,
        name,
        description
      }
    })

    return { data: passives, message: 'Pasiva creada!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al crear la pasiva.', status: 500 }
  }
}
