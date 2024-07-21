'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const fetchWeapons = async ({ name, stars, weapon }: any) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const where = {
      ...(name && { name: { contains: name } }),
      ...(stars && { stars: { contains: stars } }),
      ...(weapon && { weapon: { contains: weapon } })
    }

    if (name) {
      const weapons = await db.weapon.findMany({
        where,
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

      return weapons
    }

    const weapons = await db.weapon.findMany({
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

    return weapons
  } catch (error) {
    return null
  }
}

export const fetchWeaponByName = async (name: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const weapon = await db.weapon.findFirst({
      where: {
        name
      }
    })

    return weapon
  } catch (error: any) {
    return null
  }
}

export const fetchWeaponsById = async (id: string) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const weapon = await db.weapon.findUnique({
      where: { id }
    })

    return { data: weapon, message: 'Arma obtenido!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el arma', status: 500 }
  }
}
