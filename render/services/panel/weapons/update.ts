'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import db from '@/libs/db'

export const updateWapons = async (
  dataId: string,
  data: z.infer<typeof WeaponSchema>
) => {
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

  const { description, name, stars, stat, starsText, type } =
    validateFields.data

  try {
    const material = await db.weapon.update({
      where: { id: dataId },
      data: {
        description,
        stat,
        name,
        stars,
        starsText,
        type
      }
    })

    return { data: material, message: 'Material actualizado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar los materiales.', status: 500 }
  }
}