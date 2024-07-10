'use server'

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
        ]
      })

      return characters
    }

    const characters = await db.character.findMany({
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

    return characters
  } catch (error) {
    return null
  }
}
