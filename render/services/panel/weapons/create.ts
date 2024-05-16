'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import db from '@/libs/db'

export const createWapons = async (data: z.infer<typeof WeaponSchema>) => {
  const currentAdminRole = await currentRole()
  const validateFields = WeaponSchema.safeParse(data)

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { description, id, imageUrl, stat, name, stars, starsText, type } =
    validateFields.data

  try {
    const weapon = await db.weapon.create({
      data: {
        id,
        imageUrl,
        description,
        stat,
        name,
        stars,
        starsText,
        type
      }
    })

    return { data: weapon, message: 'Arma creada!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el arma.', status: 500 }
  }
}
