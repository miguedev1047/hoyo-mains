'use server'

import db from '@/libs/db'
import { currentRole } from '@/data/auth'

export const deleteMaterial = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.materialsByCharacter.delete({ where: { id } })
    return { message: 'Material eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el material.', status: 500 }
  }
}
