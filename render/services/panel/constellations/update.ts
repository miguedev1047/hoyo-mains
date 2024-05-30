'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterConstellationSchema } from '@/schemas'
import db from '@/libs/db'

export const updateConstellation = async (
  dataId: string,
  data: z.infer<typeof CharacterConstellationSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterConstellationSchema.safeParse(data)

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
    const passives = await db.constellationsByCharacter.update({
      where: { id: dataId },
      data: {
        name,
        description,
        imageUrl
      }
    })
    return { data: passives, message: 'Constelación actualizada!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar la constelación.', status: 500 }
  }
}
