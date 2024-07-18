'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { ArtifactSchema } from '@/schemas'
import db from '@/libs/db'

export const createArtifact = async (data: z.infer<typeof ArtifactSchema>) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = ArtifactSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { id, name, stars, starsText, description } = validateFields.data

  try {
    const artifact = await db.artifact.create({
      data: {
        id,
        name,
        stars,
        starsText,
        description
      }
    })

    return { data: artifact, message: 'Artefacto creado!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el artefacto.', status: 500 }
  }
}
