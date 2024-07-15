'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { CharacterTeamSchema } from '@/schemas'
import db from '@/libs/db'

export const updateTeamName = async (
  teamId: string,
  data: z.infer<typeof CharacterTeamSchema>
) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = CharacterTeamSchema.safeParse(data)

  if (!validateFields.success) {
    return {
      error: 'Campos inválidos.',
      status: 400
    }
  }

  const { name } = validateFields.data

  try {
    await db.teamByCharacter.update({
      where: {
        id: teamId
      },
      data: {
        name
      }
    })

    return {
      status: 201,
      message: 'Cambios guardados!'
    }
  } catch (error: any) {
    return { status: 500, message: 'Ha ocurrido un error!', error: error }
  }
}

export const updatedOrderTeams = async (items: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const transaction = items.map((list: any) =>
      db.teamByCharacter.update({
        where: {
          id: list.id
        },
        data: {
          order: list.order
        }
      })
    )

    await db.$transaction(transaction)

    return {
      status: 201,
      message: 'Cambios guardados!'
    }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!', error: error }
  }
}

export const updatedOrderCharacters = async (items: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const transaction = items.map((list: any) =>
      db.characterByTeam.update({
        where: {
          id: list.id
        },
        data: {
          order: list.order
        }
      })
    )

    await db.$transaction(transaction)

    return {
      status: 201,
      message: 'Cambios guardados!'
    }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!', error: error }
  }
}
