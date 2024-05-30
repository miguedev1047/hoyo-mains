'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deletePassive = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.passivesByCharacter.delete({ where: { id } })
    return { message: 'Pasiva eliminada.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar la pasiva.', status: 500 }
  }
}
