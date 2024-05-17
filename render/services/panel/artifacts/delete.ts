'use server'

import db from '@/libs/db'

export const deleteArtifact = async (id: string) => {
  try {
    await db.artifact.delete({ where: { id } })
    return { message: 'Artefacto eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el artefacto.', status: 500 }
  }
}
