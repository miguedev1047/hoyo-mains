'use server'
import db from '@/libs/db'
import { z } from 'zod'

import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'

export const createMaterials = async (data: z.infer<typeof MaterialSchema>) => {
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
    const material = await db.material.create({
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

    return { data: material, message: 'Material creado!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el material', status: 500 }
  }
}
