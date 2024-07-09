'use server'

import db from '@/libs/db'

export const deleteTeam = async (teamId: string) => {
  try {
    await db.bestTeamCharacter.deleteMany({ where: { teamId: teamId } })
    await db.bestTeam.delete({ where: { id: teamId } })

    return { status: 201, message: 'Equipo eliminado!' }
  } catch (error) {
    return { status: 500, error: 'Ha ocurrido un error al eliminar el equipo!' }
  }
}

export const deleteTeamCharacters = async (characterId: string) => {
  try {
    await db.bestTeamCharacter.delete({ where: { id: characterId } })
    return { status: 201, message: 'Personajes eliminados!' }
  } catch (error) {
    return {
      status: 500,
      error: 'Ha ocurrido un error al eliminar los personajes del equipo!'
    }
  }
}
