'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { ArtifactSchema } from '@/schemas'
import db from '@/libs/db'

export const updateArtifacts = async (
  dataId: string,
  data: z.infer<typeof ArtifactSchema>
) => {
  const currentAdminRole = await currentRole()
  const validateFields = ArtifactSchema.safeParse(data)

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

  const { name, stars, starsText, description } =
    validateFields.data

  try {
    const artifact = await db.artifact.update({
      where: { id: dataId },
      data: {
        name,
        stars,
        starsText,
        description
      }
    })

    return { data: artifact, message: 'Artefacto actualizado!', status: 201 }
  } catch (error: any) {
    return { error: 'Error al actualizar el artefacto.', status: 500 }
  }
}

export const updatedOrderArtifact = async (items: any) => {
  try {
    const transaction = items.map((list: any) =>
      db.artifactByCharacter.update({
        where: {
          id: list.id
        },
        data: {
          order: list.order
        }
      })
    )

    await db.$transaction(transaction)

    return {
      status: 201,
      message: 'Cambios guardados!'
    }
  } catch (error) {
    return { status: 500, message: 'Ha ocurrido un error!', error: error }
  }
}
