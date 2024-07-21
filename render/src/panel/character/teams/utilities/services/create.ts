'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterItemSchema } from '@/schemas'
import db from '@/libs/db'

export const createTeam = async (
  data: z.infer<typeof CharacterItemSchema>,
  characterId: string
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterItemSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { items: name } = validateFields.data

  try {
    const team = await db.teamByCharacter.create({
      data: {
        name,
        characterId
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

export const createCharacter = async (data: any[]) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const characters = await db.characterByTeam.createMany({
      data
    })

    return {
      data: characters,
      message: 'Personajes añadidos!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al añadir los personajes.', status: 500 }
  }
}
