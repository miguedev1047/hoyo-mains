'use server'

import db from '@/libs/db'

export const dataWeapons = async () => {
  try {
    const weapon = await db.weapon.findMany()

    return { data: weapon, message: 'Armas obtenidos!', status: 201 }
  } catch (error: any) {
    return { message: 'Error al obtener las armas', status: 500 }
  }
}

export const dataWeaponsById = async (id: string) => {
  try {
    const weapon = await db.weapon.findUnique({
      where: { id }
    })

    return { data: weapon, message: 'Arma obtenido!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al obtener el arma', status: 500 }
  }
}
