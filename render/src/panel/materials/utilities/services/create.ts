'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { MaterialSchema } from '@/schemas'
import db from '@/libs/db'

export const createMaterial = async (data: z.infer<typeof MaterialSchema>) => {
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

  const { description, id, label, name, stars, starsText, type, value } =
    validateFields.data

  try {
    const material = await db.material.create({
      data: {
        id,
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
    return { error: 'Error al crear el material.', status: 500 }
  }
}
