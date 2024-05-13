'use server'

import db from '@/libs/db'
import { z } from 'zod'

import { currentRole } from '@/data/auth'
import { CharacterSchema } from '@/schemas'

export const createCharacters = async (
  data: z.infer<typeof CharacterSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = CharacterSchema.safeParse(data)

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'You are not allowed to create characters',
      status: 403
    }

  if (!validateFields.success)
    return {
      error: 'Invalid fields',
      status: 400
    }

  const { element, name, rarity, rarityText, weapon, role } =
    validateFields.data

  try {
    await db.character.create({
      data: {
        element,
        name,
        rarity,
        rarityText,
        weapon,
        role
      }
    })

    return { message: 'Personaje creado!', status: 201 }
  } catch (error) {
    console.log(error)
    return { error: 'Error al crear el personaje', status: 500 }
  }
}
