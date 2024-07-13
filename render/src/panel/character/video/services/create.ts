'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterYoutubeSchema } from '@/schemas'
import db from '@/libs/db'

export const createVideo = async (
  data: z.infer<typeof CharacterYoutubeSchema>,
  characterId: string
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterYoutubeSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { embedVideoUrl, youtuberChannel, youtuberName } = validateFields.data

  try {
    const bestStats = await db.videoGuideByCharacter.create({
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
