'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterConstellationSchema } from '@/schemas'
import db from '@/libs/db'

export const updateConstellation = async (
  dataId: string,
  data: z.infer<typeof CharacterConstellationSchema>
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

  const { name, description } = validateFields.data

  try {
    const passives = await db.constellationsByCharacter.update({
      where: { id: dataId },
      data: {
        name,
        description
      }
    })
    return { data: passives, message: 'Constelación actualizada!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar la constelación.', status: 500 }
  }
}
