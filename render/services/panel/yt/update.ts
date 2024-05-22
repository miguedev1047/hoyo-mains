'use server'

import { z } from 'zod'
import { CharacterYoutubeSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const updateCharacterVideo = async (
  data: z.infer<typeof CharacterYoutubeSchema>,
  characterVideoId: string
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
    const characterVideo = await db.characterVideo.update({
      where: {
        id: characterVideoId
      },
      data: {
        embedVideoUrl,
        youtuberChannel,
        youtuberName
      }
    })

    return {
      data: characterVideo,
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
