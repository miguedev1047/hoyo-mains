'use server'

import { currentRole } from '@/data/auth'
import { getFullCharacterById } from '@/data/character'
import { deleteImage } from '@/utils/helpers/delete-image'
import db from '@/libs/db'

export const deleteCharacter = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const character = await getFullCharacterById(id)

    const talents = character?.talents
    const passives = character?.passives
    const constellations = character?.constellations

    talents?.forEach(async (talent) => {
      deleteImage({ path: 'talents', id: talent.id })
    })

    passives?.forEach(async (passive) => {
      deleteImage({ path: 'passives', id: passive.id })
    })

    constellations?.forEach(async (constellation) => {
      deleteImage({ path: 'constellations', id: constellation.id })
    })

    await db.character.delete({ where: { id } })
    return { message: 'Personaje eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el personaje.', status: 500 }
  }
}
