'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

export const dataWeapons = async () => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }
  try {
    const weapon = await db.weapon.findMany()

    return { data: weapon, message: 'Armas obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener las armas', status: 500 }
  }
}

export const dataWeaponByName = async (name: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
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

export const dataWeaponsById = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
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
