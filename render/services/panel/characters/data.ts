import { currentRole } from '@/data/auth'
import db from '@/libs/db'

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
