'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TeamSchema } from '@/schemas'
import db from '@/libs/db'

export const createTeam = async (data: z.infer<typeof TeamSchema>) => {
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
    const team = await db.bestTeam.create({
      data: {
        name
      }
    })
    return { data: team, message: 'Equipo creado!', status: 201 }
  } catch (error) {
    return {
      data: null,
      error: 'Hubo un error al crear el equipo.',
      status: 500
    }
  }
}

export const createMembersTeam = async (data: any) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const characters = await db.bestTeamCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: characters,
      message: 'Los personaje/s han sido creado/s!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear el/los personaje/s.', status: 500 }
  }
}