'use server'

import db from '@/libs/db'

export const getCharacterById = async (id: string) => {
  try {
    const character = await db.character.findUnique({ where: { id } })
    return character
  } catch (error) {
    return null
  }
}

export const getFullCharacterById = async (id: string) => {
  try {
    const character = await db.character.findUnique({
      where: { id },
      include: {
        materials: {
          orderBy: {
            order: 'asc'
          }
        },
        weapons: {
          orderBy: {
            order: 'asc'
          }
        },
        artifacts: {
          orderBy: {
            order: 'asc'
          }
        },
        bestStats: true,
        videoGuide: true,
        teams: {
          include: {
            characters: true
          }
        },
        talents: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        passives: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        constellations: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        ascensions: {
          orderBy: [{ level: 'asc' }, { cost: 'asc' }],
          include: {
            materials: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    })

    return character
  } catch (error) {
    return null
  }
}
