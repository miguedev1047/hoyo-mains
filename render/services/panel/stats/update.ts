'use server'

import { z } from 'zod'
import { CharacterBestStatsSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const updateBestStats = async (
  data: z.infer<typeof CharacterBestStatsSchema>,
  statId: string
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterBestStatsSchema.safeParse(data)

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

  const { circletStat, globetStat, sandStat, substatPriority } =
    validateFields.data

  const bestStats = await db.characterBestStat.create({
    data: {
      circletStat,
      globetStat,
      sandStat,
      substatPriority
    }
  })

  try {
    const bestStats = await db.characterBestStat.update({
      where: {
        id: statId
      },
      data
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
