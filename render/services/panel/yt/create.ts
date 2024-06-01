'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterYoutubeSchema } from '@/schemas'
import db from '@/libs/db'

export const createvideoGuide = async (
  data: z.infer<typeof CharacterYoutubeSchema>,
  characterId: string
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterYoutubeSchema.safeParse(data)

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

  const { embedVideoUrl, youtuberChannel, youtuberName } = validateFields.data

  try {
    const bestStats = await db.videoGuide.create({
      data: {
        embedVideoUrl,
        youtuberChannel,
        youtuberName,
        characterId
      }
    })

    return {
      data: bestStats,
      message: 'Se ha creado la video guía!',
      status: 201
    }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al crear la video guía.',
      status: 500
    }
  }
}
