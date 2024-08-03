'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const createWeapon = async (data: any[]) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const weapons = await db.weaponByCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: weapons,
      message: 'Armas añadidas!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al añadidir las armas.', status: 500 }
  }
}
