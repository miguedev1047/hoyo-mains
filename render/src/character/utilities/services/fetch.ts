'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

interface FetchCharactersProps {
  name: string
}

export const fetchCharacterByName = async ({ name }: FetchCharactersProps) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const character = await db.character.findFirst({
      where: {
        name
      },
      include: {
        materials: true,
        weapons: true,
        artifacts: true,
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
