'use server'

import { currentRole } from '@/data/auth'
import db from '@/libs/db'

interface Props {
  imageUrl: string
  id: string
  path: string
}

export const uploadImageTheCloud = async ({ imageUrl, id, path }: Props) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  try {
    switch (path) {
      case 'characters':
        await db.character.update({ where: { id }, data: { imageUrl } })
        return { message: 'Imagen subida con éxito.', status: 201 }
      case 'weapons':
        await db.weapon.update({ where: { id }, data: { imageUrl } })
        return { message: 'Imagen subida con éxito.', status: 201 }
      case 'artifacts':
        await db.artifact.update({ where: { id }, data: { imageUrl } })
        return { message: 'Imagen subida con éxito.', status: 201 }
      case 'materials':
        await db.material.update({ where: { id }, data: { imageUrl } })
        return { message: 'Imagen subida con éxito.', status: 201 }
      default:
        return {
          error: 'No existe la ruta.',
          status: 404
        }
    }
  } catch (error) {
    return {
      error: 'Error al subir la imagen.',
      status: 500
    }
  }
}
