'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { WeaponSchema } from '@/schemas'
import { dataWeaponsByName } from '@/render/services/panel/weapons/data'
import db from '@/libs/db'

export const createWapons = async (data: z.infer<typeof WeaponSchema>) => {
  const currentAdminRole = await currentRole()
  const validateFields = WeaponSchema.safeParse(data)

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { description, atk, id, stat, name, stars, starsText, type } =
    validateFields.data

  const existsWeapon = await dataWeaponsByName(name)

  if (existsWeapon)
    return {
      error: 'Ya existe un arma con ese nombre.',
      status: 400
    }

  try {
    const weapon = await db.weapon.create({
      data: {
        id,
        description,
        atk: parseInt(atk),
        stat,
        name,
        stars,
        starsText,
        type
      }
    })

    return { data: weapon, message: 'Arma creada!', status: 201 }
  } catch (error) {
    return { error: 'Error al crear el arma.', status: 500 }
  }
}

export const createWeaponCharacters = async (data: any[]) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  try {
    const weapons = await db.weaponByCharacter.createMany({
      data,
      skipDuplicates: true
    })

    return {
      data: weapons,
      message: 'Las arma/s han sido creada/s!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear el/las arma/s.', status: 500 }
  }
}
