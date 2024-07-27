'use server'

import db from '@/libs/db'

interface FetchMaterialsProps {
  stars: number
  name: string
}

export const fetchMaterials = async ({ name, stars }: FetchMaterialsProps) => {
  try {
    if (name || stars) {
      const materials = await db.material.findMany({
        where: {
          ...(name && { name: { contains: name } }),
          ...(stars && { stars: stars })
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

      return materials
    }

    const materials = await db.material.findMany({
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

    return materials
  } catch (error) {
    return null
  }
}
