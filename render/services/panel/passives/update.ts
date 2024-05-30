'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharactersPassiveSchema } from '@/schemas'
import db from '@/libs/db'

export const updatePassive = async (
  dataId: string,
  data: z.infer<typeof CharactersPassiveSchema>
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

  const { name, description, imageUrl } = validateFields.data

  try {
    const passives = await db.passivesByCharacter.update({
      where: { id: dataId },
      data: {
        name,
        description,
        imageUrl
      }
    })
    return { data: passives, message: 'Pasiva actualizada!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar la pasiva.', status: 500 }
  }
}
