'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const fetchTalentById = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
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
