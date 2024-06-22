'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
import { getCharacterByName } from '@/render/services/panel/characters/data'
import db from '@/libs/db'

export const createCharacters = async (
  data: z.infer<typeof CharacterSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterSchema.safeParse(data)

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

  const { element, name, id, stars, starsText, weapon, role } =
    validateFields.data

  const isExistingCharacter = await getCharacterByName(name)

  if (isExistingCharacter)
    return {
      error: 'El personaje ya existe.',
      status: 409
    }

  try {
    const character = await db.character.create({
      data: {
        id,
        element,
        name,
        stars,
        starsText,
        weapon,
        role
      }
    })

    return { data: character, message: 'Personaje creado!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el personaje.', status: 500 }
  }
}

export const createMaterialCharacters = async (data: any[]) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const materials = await db.materialsByCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: materials,
      message: 'Los material/es han sido creado/s!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear el/los material/es.', status: 500 }
  }
}
