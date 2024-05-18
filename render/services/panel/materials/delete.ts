'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deleteMaterial = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.material.delete({ where: { id } })
    return { message: 'Material eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el material.', status: 500 }
  }
}
