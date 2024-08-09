'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const fetchTierlists = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403,
    }

  try {
    const tierlists = await db.tierlist.findMany({
      include: {
        characters: true,
        tier: {
          include: {
            characters: true,
          },
        },
      },
      orderBy: [
        // {order: 'asc'},
        { name: 'asc' },
        { createdDate: 'asc' },
      ],
    })

    return tierlists
  } catch (error) {
    return null
  }
}

export const fetchCharacters = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403,
    }

  try {
    const characters = await db.character.findMany({
      orderBy: [{ stars: 'desc' }, { name: 'asc' }, { createdDate: 'asc' }],
    })

    return characters
  } catch (error) {
    return null
  }
}
