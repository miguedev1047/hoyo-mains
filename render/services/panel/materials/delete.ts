'use server'

import db from '@/libs/db'

export const deleteMaterial = async (id: string) => {
  try {
    await db.material.delete({ where: { id } })
    return { message: 'Material eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el material.', status: 500 }
  }
}
