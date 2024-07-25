'use server'

import db from '@/libs/db'

interface FetchWeaponsProps {
  name: string
  stars: number
  type: string
}

export const fetchWeapons = async ({
  name,
  stars,
  type
}: FetchWeaponsProps) => {
  try {
    if (name || stars || type) {
      const weapons = await db.weapon.findMany({
        where: {
          ...(name && { name: { contains: name } }),
          ...(stars && { stars }),
          ...(type && { type: { contains: type } })
        },
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

      return weapons
    }

    const weapons = await db.weapon.findMany({
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

    return weapons
  } catch (error) {
    return null
  }
}
