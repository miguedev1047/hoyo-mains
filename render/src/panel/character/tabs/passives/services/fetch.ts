'use server'

import { currentRole } from "@/data/auth"
import db from "@/libs/db"

export const fetchPassiveById =  async (id: string) => {
    const role = await currentRole()
  
    if (role !== 'ADMIN' && role !== 'OWNER') {
      return {
        error: 'No tienes permisos para realizar esta acción.',
        status: 403
      }
    }
  
    try {
      const passives = await db.passivesByCharacter.findUnique({ where: { id } })
  
      return { data: passives, message: 'Pasiva obtenida!', status: 201 }
    } catch (error: any) {
      return { message: 'Error al obtener la pasiva', status: 500 }
    }
  }