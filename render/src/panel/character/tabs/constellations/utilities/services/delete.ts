'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deleteConstellation = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.constellationsByCharacter.delete({ where: { id } })
    return { message: 'Constelación eliminada.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar la constelación.', status: 500 }
  }
}
