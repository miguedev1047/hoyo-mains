'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const updatedOrderMaterial = async (items: any) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const transaction = items.map((list: any) =>
      db.materialsByCharacter.update({
        where: {
          id: list.id
        },
        data: {
          order: list.order
        }
      })
    )

    await db.$transaction(transaction)

    return {
      status: 200,
      message: 'Cambios guardados!'
    }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!', error: error }
  }
}
