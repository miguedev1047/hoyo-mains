'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

interface FetchMaterialsProps {
  name: string
  type: string
  stars: number
}

export const fetchMaterials = async ({
  name,
  type,
  stars
}: FetchMaterialsProps) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return null
  }

  try {
    const materials = await db.material.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(type && { type: { contains: type, mode: 'insensitive' } }),
        ...(stars && { stars: stars })
      },
      orderBy: [
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

    return materials
  } catch (error) {
    return null
  }
}

export const fetchMaterialById = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
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

