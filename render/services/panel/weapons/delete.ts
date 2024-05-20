'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deleteWeapon = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.weapon.delete({ where: { id } })
    return { message: 'Arma eliminada.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el arma.', status: 500 }
  }
}

export const deleteCharacterWeapon = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    await db.weaponByCharacter.delete({ where: { id } })
    return { message: 'Arma eliminada.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el arma.', status: 500 }
  }
}
