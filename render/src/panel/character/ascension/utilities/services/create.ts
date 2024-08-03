'use server'

import { z } from 'zod'
import { CharacterAscensionSchema } from '@/schemas'
import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const createAscension = async (
  data: z.infer<typeof CharacterAscensionSchema>,
  materials: any,
  ascensionId: string,
  characterId: string
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterAscensionSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { cost, level } = validateFields.data

  try {
    await db.ascensionByCharacter.create({
      data: {
        id: ascensionId,
        cost: Number(cost),
        level: Number(level),
        characterId
      }
    })

    await db.materialByAscension.createMany({
      data: materials,
      skipDuplicates: true
    })

    return { message: 'Ascensión creada!', status: 201 }
  } catch (error) {
    console.log(error)
    return { error: 'Ha ocurrido un error!', status: 500 }
  }
}
