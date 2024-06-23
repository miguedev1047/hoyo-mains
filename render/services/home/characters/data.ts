import db from '@/libs/db'
import { Prisma } from '@prisma/client'

export type characterType = Prisma.CharacterGetPayload<{
  include: {
    materials: true
    weapons: true
    artifacts: true
    bestStats: true
    videoGuide: true
    teams: {
      include: {
        characters: true
      }
    }
    talents: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    passives: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    constellations: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    ascensions: {
      orderBy: [{ level: 'asc' }, { cost: 'asc' }]
      include: {
        materials: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    }
  }
}>

export const dataCharacterByName = async (name: string) => {
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

    return character as characterType
  } catch (error) {
    return null
  }
}
