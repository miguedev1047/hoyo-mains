'use server'

import db from '@/libs/db'

export const deleteTeam = async (teamId: string) => {
  try {
    await db.characterTeam.deleteMany({ where: { teamId: teamId } })
    await db.team.delete({ where: { id: teamId } })

    return { status: 201, message: 'Equipo eliminado!' }
  } catch (error) {
    return { status: 500, error: 'Ha ocurrido un error al eliminar el equipo!' }
  }
}

export const deleteTeamCharacters = async (characterId: string) => {
  try {
    await db.characterTeam.delete({ where: { id: characterId } })
    return { status: 201, message: 'Personajes eliminados!' }
  } catch (error) {
    return {
      status: 500,
      error: 'Ha ocurrido un error al eliminar los personajes del equipo!'
    }
  }
}
