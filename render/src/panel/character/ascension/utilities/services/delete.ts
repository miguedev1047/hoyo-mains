'use server'

import db from '@/libs/db'

export const deleteAscension = async (id: string) => {
  try {
    await db.materialByAscension.deleteMany({
      where: {
        ascensionId: id
      }
    })

    await db.ascensionByCharacter.delete({
      where: { id }
    })

    return { message: 'Ascensión eliminada!', status: 201 }
  } catch (error) {
    return { error: 'Ha ocurrido un error.', status: 500 }
  }
}
