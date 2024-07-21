'use server'

import db from '@/libs/db'

interface FetchCharactersProps {
  name: string
  element: string
  weapon: string
  stars: number
}

export const fetchCharacters = async ({
  name,
  element,
  weapon,
  stars
}: FetchCharactersProps) => {
  try {
    if (name || element || weapon || stars) {
      const characters = await db.character.findMany({
        where: {
          public: true,
          ...(name && { name: { contains: name } }),
          ...(element && { element: { equals: element } }),
          ...(weapon && { weapon: { equals: weapon } }),
          ...(stars && { stars: { equals: stars } })
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
      ]
    })
    return characters
  } catch (error) {
    return null
  }
}
