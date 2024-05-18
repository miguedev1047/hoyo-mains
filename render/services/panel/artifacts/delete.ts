'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deleteArtifact = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.artifact.delete({ where: { id } })
    return { message: 'Artefacto eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el artefacto.', status: 500 }
  }
}
