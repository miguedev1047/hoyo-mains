'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterTalentSchema } from '@/schemas'
import db from '@/libs/db'

export const createTalent = async (
  data: z.infer<typeof CharacterTalentSchema>,
  characterId: string | undefined
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterTalentSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { id, name, description } = validateFields.data

  try {
    const talents = await db.talentsByCharacter.create({
      data: {
        id,
        characterId,
        name,
        description
      }
    })

    return { data: talents, message: 'Talento creado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al crear el talento.', status: 500 }
  }
}
