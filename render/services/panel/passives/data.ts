'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataPassives = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }
  try {
    const passives = await db.passivesByCharacter.findMany()

    return { data: passives, message: 'Pasivas obtenidas!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los pasivas', status: 500 }
  }
}

export const dataPassiveId = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const passives = await db.passivesByCharacter.findUnique({ where: { id } })

    return { data: passives, message: 'Pasiva obtenida!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener la pasiva', status: 500 }
  }
}
