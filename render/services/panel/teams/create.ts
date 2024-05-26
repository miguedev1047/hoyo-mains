'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterItemSchema } from '@/schemas'
import db from '@/libs/db'

export const createTeam = async (
  data: z.infer<typeof CharacterItemSchema>,
  characterId: string
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterItemSchema.safeParse(data)

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

  const { items: name } = validateFields.data

  try {
    const teams = await db.team.create({
      data: {
        name,
        characterId
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

export const createCharactersCharacter = async (data: any[]) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const characters = await db.characterByTeam.createMany({
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
