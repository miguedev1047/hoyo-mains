'use server'

import { currentRole } from '@/data/auth'
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
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

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

export const fetchCharacterByName = async (name: string) => {
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
      }
    })

    return character
  } catch (error) {
    return null
  }
}
