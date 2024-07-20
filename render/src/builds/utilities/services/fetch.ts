'use server'

import db from '@/libs/db'

interface FetchBuildProps {
  name: string
  element: string
  weapon: string
  stars: number
}

export const fetchBuilds = async ({
  name,
  element,
  stars,
  weapon
}: FetchBuildProps) => {
  try {
    if (name || element || stars || weapon) {
      const builds = await db.character.findMany({
        where: {
          public: true,
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          ...(element && { element: { equals: element } }),
          ...(stars && { stars: { equals: stars } }),
          ...(weapon && { weapon: { equals: weapon } })
        },
        include: {
          artifacts: true,
          weapons: true,
          talents: true,
          bestStats: true
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
        ]
      })

      return builds
    }

    const builds = await db.character.findMany({
      where: {
        public: true
      },
      include: {
        artifacts: true,
        weapons: true,
        talents: true,
        bestStats: true
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
      ]
    })

    return builds
  } catch (error) {
    return null
  }
}
