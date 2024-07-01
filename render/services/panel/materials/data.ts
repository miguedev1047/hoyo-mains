'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataMaterials = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const material = await db.material.findMany()

    return { data: material, message: 'Materiales obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener los materiales', status: 500 }
  }
}

export const dataMaterialByName = async (name: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const material = await db.material.findFirst({
      where: {
        name
      }
    })

    return material
  } catch (error: any) {
    return null
  }
}

export const dataMaterialById = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const material = await db.material.findUnique({
      where: { id }
    })

    return { data: material, message: 'Material obtenido!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el material', status: 500 }
  }
}
