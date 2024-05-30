'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataConstellations = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }
  try {
    const constellations = await db.constellationsByCharacter.findMany()

    return {
      data: constellations,
      message: 'Constelaciónes obtenidas!',
      status: 201
    }
  } catch (error: any) {
    return { message: 'Error al obtener las constelaciones', status: 500 }
  }
}

export const dataConstellationId = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const constellations = await db.constellationsByCharacter.findUnique({
      where: { id }
    })

    return {
      data: constellations,
      message: 'Constelación obtenida!',
      status: 201
    }
  } catch (error: any) {
    return { message: 'Error al obtener la constelación', status: 500 }
  }
}
