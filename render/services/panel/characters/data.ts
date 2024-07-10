import { currentRole } from '@/data/auth'
import db from '@/libs/db'

interface FetchCharactersByNameTypes {
  name: string
  element?: string
  weapon?: string
}

export const fetchCharacters = async ({
  name,
  element,
  weapon
}: FetchCharactersByNameTypes) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const where = {
      ...(name && { name: { contains: name } }),
      ...(element && { element: { contains: element } }),
      ...(weapon && { weapon: { contains: weapon } })
    }

    if (name || element || weapon) {
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

export const getCharacterByName = async (name: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
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
