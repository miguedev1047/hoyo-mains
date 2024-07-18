'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import db from '@/libs/db'

export const updateMaterial = async (
  dataId: string,
  data: z.infer<typeof MaterialSchema>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = MaterialSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { description, label, name, stars, starsText, type, value } =
    validateFields.data

  try {
    const material = await db.material.update({
      where: { id: dataId },
      data: {
        description,
        label,
        name,
        stars,
        starsText,
        type,
        value
      }
    })

    return { data: material, message: 'Material actualizado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar los materiales.', status: 500 }
  }
}
