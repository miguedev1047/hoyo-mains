'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import db from '@/libs/db'

export const updateWeapon = async (
  dataId: string,
  data: z.infer<typeof WeaponSchema>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = WeaponSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { description, atk, name, stars, stat, starsText, type } =
    validateFields.data

  try {
    const material = await db.weapon.update({
      where: { id: dataId },
      data: {
        description,
        stat,
        name,
        atk: parseInt(atk),
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
