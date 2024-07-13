'use server'

import { z } from 'zod'
import { CharacterBestStatsSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const updateBestStat = async (
  data: z.infer<typeof CharacterBestStatsSchema>,
  statId: string
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterBestStatsSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { circletStat, globetStat, sandStat, substatPriority } =
    validateFields.data

  try {
    const bestStats = await db.statsByCharacter.update({
      where: {
        id: statId
      },
      data: {
        circletStat,
        globetStat,
        sandStat,
        substatPriority
      }
    })

    return {
      data: bestStats,
      message: 'Cambios guardados!',
      status: 201
    }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al actualizar las estadísticas.',
      status: 500
    }
  }
}
