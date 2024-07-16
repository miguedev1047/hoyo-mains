'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const deleteTeam = async (teamId: string | undefined) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    await db.bestTeamCharacter.deleteMany({
      where: {
        teamId: teamId
      }
    })

    await db.bestTeam.delete({
      where: {
        id: teamId
      }
    })

    return { status: 201, message: 'Equipo eliminado!' }
  } catch (error) {
    return { status: 500, error: 'Ha ocurrido un error al eliminar el equipo!' }
  }
}

export const deleteCharacter = async (characterId: string | undefined) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    await db.bestTeamCharacter.delete({
      where: {
        id: characterId
      }
    })

    return { status: 201, message: 'Personaje eliminado!' }
  } catch (error) {
    return {
      status: 500,
      error: 'Ha ocurrido un error al eliminar el personaje!'
    }
  }
}
