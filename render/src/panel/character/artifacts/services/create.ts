'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const createArtifact = async (data: any[]) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const artifact = await db.artifactByCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: artifact,
      message: 'Los artefactos añadidos!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al añadir los artefactos.', status: 500 }
  }
}
