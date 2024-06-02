'use server'

import db from '@/libs/db'

export const deleteTeam = async (teamId: string | undefined) => {
  try {
    await db.characterByTeam.deleteMany({
      where: {
        teamId: teamId
      }
    })

    await db.teamByCharacter.delete({
      where: {
        id: teamId
      }
    })

    return { status: 200, message: 'Equipo eliminado!' }
  } catch (error) {
    return { status: 500, error: 'Ha ocurrido un error al eliminar el equipo!' }
  }
}

export const deleteCharacterTeam = async (
  characterTeamId: string | undefined
) => {
  try {
    await db.characterByTeam.delete({
      where: {
        id: characterTeamId
      }
    })

    return { status: 200, message: 'Personaje eliminado!' }
  } catch (error) {
    return {
      status: 500,
      error: 'Ha ocurrido un error al eliminar el personaje!'
    }
  }
}
