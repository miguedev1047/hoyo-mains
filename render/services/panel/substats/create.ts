'use server'

import { z } from 'zod'
import { CharacterBestStatsSchema } from '@/schemas'
import db from '@/libs/db'

export const createBestStats = async (
  data: z.infer<typeof CharacterBestStatsSchema>
) => {
  try {
    const bestStats = await db.characterBestStat.create({
      data
    })

    return { data: bestStats, message: 'Estadísticas agregadas!', status: 201 }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al agregar las estadísticas.',
      status: 500
    }
  }
}
