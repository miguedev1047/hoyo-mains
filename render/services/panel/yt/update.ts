'use server'

import { z } from 'zod'
import { CharacterYoutubeSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const updatevideoGuide = async (
  data: z.infer<typeof CharacterYoutubeSchema>,
  videoGuideId: string
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
    const videoGuide = await db.videoGuideByCharacter.update({
      where: {
        id: videoGuideId
      },
      data: {
        embedVideoUrl,
        youtuberChannel,
        youtuberName
      }
    })

    return {
      data: videoGuide,
      message: 'Cambios guardados!',
      status: 201
    }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al actualizar la video guía.',
      status: 500
    }
  }
}
