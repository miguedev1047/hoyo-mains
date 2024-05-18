'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataArtifacts = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const artifact = await db.artifact.findMany()

    return { data: artifact, message: 'Artefactos obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los artefactos', status: 500 }
  }
}

export const dataArtifactById = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const artifact = await db.artifact.findUnique({
      where: { id }
    })

    return { data: artifact, message: 'Artefacto obtenido!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el artefacto', status: 500 }
  }
}
