'use server'

import db from '@/libs/db'

export const deleteWeapon = async (id: string) => {
  try {
    await db.weapon.delete({ where: { id } })
    return { message: 'Arma eliminada.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el arma.', status: 500 }
  }
}
