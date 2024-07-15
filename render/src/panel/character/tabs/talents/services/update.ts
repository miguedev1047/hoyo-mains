'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterTalentSchema } from '@/schemas'
import db from '@/libs/db'

export const updateTalent = async (
  dataId: string,
  data: z.infer<typeof CharacterTalentSchema>
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

  const { name, description } = validateFields.data

  try {
    const talents = await db.talentsByCharacter.update({
      where: { id: dataId },
      data: {
        name,
        description
      }
    })
    return { data: talents, message: 'Talento actualizado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar el talento.', status: 500 }
  }
}
