'use server'

import db from '@/libs/db'

export const dataMaterials = async () => {
  try {
    const material = await db.material.findMany()

    return { data: material, message: 'Material obtenidos', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los materiales', status: 500 }
  }
}

export const dataMaterialById = async (id: string) => {
  try {
    const material = await db.material.findUnique({
      where: { id }
    })

    return { data: material, message: 'Material obtenido', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el material', status: 500 }
  }
}
