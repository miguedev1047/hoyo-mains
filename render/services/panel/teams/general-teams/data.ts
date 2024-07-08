'use server'

import db from '@/libs/db'

export const fetchTeamByName = async (name: string) => {
  try {
    const character = await db.character.findFirst({ where: { name } })

    if (name) {
      const team = await db.team.findMany({
        include: {
          characters: {
            where: {
              id: character?.id
            }
          }
        }
      })

      return team
    }

    const teams = await db.team.findMany({
      include: {
        characters: true
      }
    })
    return teams
  } catch (error) {
    return null
  }
}

export const fetchCharacterById = async (id: string) => {
  try {
    const character = await db.character.findMany({
      where: {
        id
      }
    })
    return character
  } catch (error) {
    return null
  }
}

export const fetchCharacters = async () => {
  try {
    const characters = await db.character.findMany()
    return characters
  } catch (error) {
    return null
  }
}
