'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterConfigurationSchema } from '@/schemas'
import db from '@/libs/db'

export const updateCharacterConfig = async (
  data: z.infer<typeof CharacterConfigurationSchema>,
  characterId: string | undefined
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterConfigurationSchema.safeParse(data)

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

  const { isNew, public: isPublic } = validateFields.data

  try {
    await db.character.update({
      where: {
        id: characterId
      },
      data: {
        isNew,
        public: isPublic
      }
    })

    return {
      message: 'Cambios guardados!',
      status: 201
    }
  } catch (error) {
    return {
      error: 'Error al actualizar las configuraciones del personaje.',
      status: 500
    }
  }
}
