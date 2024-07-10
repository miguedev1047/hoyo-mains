import db from '@/libs/db'

interface FetchCharactersByNameTypes {
  name: string
  element?: string
  stars?: number
  weapon?: string
}

export const fetchCharacters = async ({
  name,
  element,
  weapon,
  stars
}: FetchCharactersByNameTypes) => {
  try {
    const where = {
      public: true,
      ...(name && { name: { contains: name } }),
      ...(element && { element: { contains: element } }),
      ...(stars && { stars: { equals: stars } }),
      ...(weapon && { weapon: { contains: weapon } })
    }

    if (name || element || weapon || stars) {
      const characters = await db.character.findMany({
        where,
        orderBy: [
          {
            isNew: 'desc'
          },
          {
            stars: 'desc'
          },
          {
            name: 'asc'
          },
          {
            createdDate: 'asc'
          }
        ],
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

      return characters
    }

    const characters = await db.character.findMany({
      where: {
        public: true
      },
      orderBy: [
        {
          isNew: 'desc'
        },
        {
          stars: 'desc'
        },
        {
          name: 'asc'
        },
        {
          createdDate: 'asc'
        }
      ],
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

    return characters
  } catch (error) {
    return null
  }
}

export const fetchCharactersByName = async (name: string) => {
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
