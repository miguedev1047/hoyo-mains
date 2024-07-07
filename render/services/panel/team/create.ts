'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'
import { TeamSchema } from '@/schemas'
import { z } from 'zod'

export const CreateTeam = async (data: z.infer<typeof TeamSchema>) => {
  const currentAdminRole = await currentRole()
  const validateFields = TeamSchema.safeParse(data)

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

  const { name } = validateFields.data

  try {
    const teams = await db.teamByCharacter.create({
      data: {
        name
      }
    })
    return { data: teams, message: 'Equipo creado!', status: 201 }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al crear el equipo.',
      status: 500
    }
  }
}
