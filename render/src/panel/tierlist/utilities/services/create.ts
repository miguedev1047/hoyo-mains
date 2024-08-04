'use server'

import { z } from 'zod'
import { currentRole } from '@/data/auth'
import { TierlistSchema } from '@/schemas'
import db from '@/libs/db'

export const createTierlist = async (data: z.infer<typeof TierlistSchema>) => {
  const role = await currentRole()

  if (role !== 'ADMIN' && role !== 'OWNER')
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }

  const validateFields = TierlistSchema.safeParse(data)

  if (!validateFields.success)
    return {
      error: 'Campos inválidos.',
      status: 400
    }

  const { name } = validateFields.data

  try {
    const tierlistId = crypto.randomUUID()

    const tierlist = await db.tierlist.create({
      data: {
        name,
        id: tierlistId
      }
    })

    await db.tier.createMany({
      data: [
        { name: 'SS', rank: 1, tierlistId },
        { name: 'S', rank: 2, tierlistId },
        { name: 'A', rank: 3, tierlistId },
        { name: 'B', rank: 4, tierlistId },
        { name: 'C', rank: 5, tierlistId },
        { name: 'D', rank: 6, tierlistId }
      ]
    })

    return {
      data: tierlist,
      message: 'Tierlist creada!',
      status: 201
    }
  } catch (error) {
    return { error: 'Error al crear la tierlist.', status: 500 }
  }
}
