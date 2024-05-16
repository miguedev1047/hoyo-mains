'use server'

import db from '@/libs/db'

export const deleteCharacter = async (id: string) => {
  try {
    await db.character.delete({ where: { id } })
    return { message: 'Personaje eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el personaje.', status: 500 }
  }
}
