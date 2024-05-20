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

export const createArtifactCharacters = async (data: any[]) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const weapons = await db.artifactByCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: weapons,
      message: 'Los artefacto/s han sido creado/s!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear el/los artefacto/s.', status: 500 }
  }
}
