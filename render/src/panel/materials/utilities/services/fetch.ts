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
        ...(name && { name: { contains: name } }),
        ...(type && { type: { contains: type } }),
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
    const material = await db.artifact.findUnique({
      where: { id }
    })

    return material
  } catch (error: any) {
    return null
  }
}
