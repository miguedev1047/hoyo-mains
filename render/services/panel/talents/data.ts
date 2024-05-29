'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataTalents = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }
  try {
    const talents = await db.talentsByCharacter.findMany()

    return { data: talents, message: 'Talentos obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los talentos', status: 500 }
  }
}

export const dataTalentById = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const talents = await db.talentsByCharacter.findUnique({ where: { id } })

    return { data: talents, message: 'Talento obtenido!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener el talento', status: 500 }
  }
}
