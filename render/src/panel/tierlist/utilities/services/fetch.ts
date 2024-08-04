'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const fetchTierlists = async () => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    const tierlists = await db.tierlist.findMany({
      include: {
        characters: true,
        tier: true
      },
      orderBy: [
        // {order: 'asc'},
        { name: 'asc' },
        { createdDate: 'asc' }
      ]
    })

    return tierlists
  } catch (error) {
    return null
  }
}
