'use server'

import { z } from 'zod'
import { CharacterBestStatsSchema } from '@/schemas'
import db from '@/libs/db'

export const updateBestStats = async (
  data: z.infer<typeof CharacterBestStatsSchema>,
  statId: string
) => {
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
