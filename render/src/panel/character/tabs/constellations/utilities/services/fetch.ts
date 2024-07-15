'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const fetchConstellationById = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
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
