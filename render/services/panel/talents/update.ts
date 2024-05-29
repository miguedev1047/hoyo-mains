'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterTalentSchema } from '@/schemas'
import db from '@/libs/db'

export const updateTalents = async (
  dataId: string,
  data: z.infer<typeof CharacterTalentSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterTalentSchema.safeParse(data)

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

  const { name, description, imageUrl } = validateFields.data

  try {
    const talents = await db.talentsByCharacter.update({
      where: { id: dataId },
      data: {
        name,
        description,
        imageUrl
      }
    })
    return { data: talents, message: 'Talento actualizado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar el talento.', status: 500 }
  }
}
