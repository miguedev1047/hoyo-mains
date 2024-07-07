'use server'

import db from '@/libs/db'

export const fetchTeamByName = async (name: string) => {
  try {
    
    const character = await db.character.findFirst({ where: { name } })

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
  } catch (error) {
    return null
  }
}
