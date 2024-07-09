'use server'

import db from '@/libs/db'

export const fetchTeamByName = async (name: string) => {
  try {
    const character = await db.character.findFirst({ where: { name } })

    const bestTeamCharacter = await db.characterTeam.findFirst({
      where: { characterId: character?.id }
    })
    
    const characterId = bestTeamCharacter?.characterId

    if (characterId) {
      const team = await db.team.findMany({
        include: {
          characters: true
        },
        where: {
          characters: {
            some: {
              characterId: characterId  
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
