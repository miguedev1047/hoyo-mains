'use server'

import { currentRole } from '@/render/src/shared/utilities/auth'
import db from '@/libs/db'

export const createMaterialCharacters = async (data: any[]) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const materials = await db.materialsByCharacter.createMany({
      data
    })

    return {
      data: materials,
      message: 'Los material/es han sido creado/s!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear el/los material/es.', status: 500 }
  }
}
