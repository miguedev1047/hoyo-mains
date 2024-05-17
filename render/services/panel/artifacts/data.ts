'use server'

import db from '@/libs/db'

export const dataArtifacts = async () => {
  try {
    const artifact = await db.artifact.findMany()

    return { data: artifact, message: 'Artefactos obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los artefactos', status: 500 }
  }
}

export const dataArtifactById = async (id: string) => {
  try {
    const artifact = await db.artifact.findUnique({
      where: { id }
    })

    return { data: artifact, message: 'Artefacto obtenido!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el artefacto', status: 500 }
  }
}
