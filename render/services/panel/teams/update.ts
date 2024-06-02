'use server'

import db from '@/libs/db'

export const updatedOrderTeams = async (items: any) => {
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
