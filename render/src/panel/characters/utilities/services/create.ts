'use server'

import { z } from 'zod'
import { fetchCharacterByName } from '@/render/src/panel/characters/utilities/services/fetch'
import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'
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

  const isExistingCharacter = await fetchCharacterByName(name)

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
