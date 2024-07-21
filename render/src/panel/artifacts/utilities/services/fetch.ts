'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

interface FetchArtifactsProps {
  name: string
}

export const fetchArtifacts = async ({ name }: FetchArtifactsProps) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return null
  }

  try {
    if (name) {
      const artifacts = await db.artifact.findMany({
        where: {
          name: { contains: name }
        }
      })

      return artifacts
    }

    const artifacts = await db.artifact.findMany()
    return artifacts
  } catch (error) {
    return null
  }
}

export const fetchArtifactByName = async (name: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return null
  }

  try {
    const artifact = await db.artifact.findFirst({
      where: {
        name
      }
    })

    return artifact
  } catch (error: any) {
    return null
  }
}

export const fetchArtifactById = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
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
