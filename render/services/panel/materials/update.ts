'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import db from '@/libs/db'

export const updateMaterials = async (
  dataId: string,
  data: z.infer<typeof MaterialSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = MaterialSchema.safeParse(data)

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
