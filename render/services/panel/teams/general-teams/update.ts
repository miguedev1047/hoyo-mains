'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TeamSchema } from '@/schemas'
import db from '@/libs/db'

export const updateNameTeam = async (
  teamId: string,
  data: z.infer<typeof TeamSchema>
) => {
  const validateFields = TeamSchema.safeParse(data)
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  if (!validateFields.success) {
    return {
      error: 'Campos inválidos.',
      status: 400
    }
  }

  const { name } = validateFields.data

  try {
    await db.team.update({
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
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const transaction = items.map((list: any) =>
      db.team.update({
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
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const transaction = items.map((list: any) =>
      db.characterTeam.update({
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
