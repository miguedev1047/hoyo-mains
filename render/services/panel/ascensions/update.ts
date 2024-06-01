'use server'

import db from '@/libs/db'

export const updateQuantityAscensionMaterial = async (
  id: string,
  quantity: number
) => {
  try {
    await db.materialByAscension.update({
      where: { id },
      data: { quantity }
    })

    return { message: 'Material actualizado.', status: 201 }
  } catch (error) {
    return { error: 'Hubo un problema al actualizar el material.', status: 500 }
  }
}
