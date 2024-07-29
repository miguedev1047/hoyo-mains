'use server'

import db from '@/libs/db'

export const fetchTeamByName = async (name: string) => {
  try {
    const character = await db.character.findFirst({ where: { name } })

    const bestTeamCharacter = await db.bestTeamCharacter.findFirst({
      where: { characterId: character?.id }
    })

    const characterId = bestTeamCharacter?.characterId

    if (characterId) {
      const team = await db.bestTeam.findMany({
        include: {
          characters: true
        },
        where: {
          characters: {
            some: {
              characterId: characterId
            }
          }
        },
        orderBy: [{ order: 'asc' }, { createdDate: 'desc' }]
      })

      return team
    }

    const teams = await db.bestTeam.findMany({
      include: {
        characters: true
      },
      orderBy: [{ order: 'asc' }, { createdDate: 'desc' }]
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
    const characters = await db.character.findMany({
      orderBy: [
        {
          stars: 'desc'
        },
        {
          name: 'asc'
        },
        {
          createdDate: 'asc'
        }
      ]
    })
    return characters
  } catch (error) {
    return null
  }
}
