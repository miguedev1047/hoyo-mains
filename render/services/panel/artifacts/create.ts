'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { ArtifactSchema } from '@/schemas'
import db from '@/libs/db'

export const createArtifacts = async (data: z.infer<typeof ArtifactSchema>) => {
  const currentAdminRole = await currentRole()
  const validateFields = ArtifactSchema.safeParse(data)

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

  const {
    id,
    imageUrl,
    name,
    stars,
    starsText,
    descTwoPieces,
    descFourPieces
  } = validateFields.data

  try {
    const artifact = await db.artifact.create({
      data: {
        id,
        imageUrl,
        name,
        stars,
        starsText,
        descTwoPieces,
        descFourPieces
      }
    })

    return { data: artifact, message: 'Artefacto creado!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el Artefacto.', status: 500 }
  }
}
