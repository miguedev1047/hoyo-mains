'use server'

import { currentRole } from '@/data/auth'
import { getFullCharacterById } from '@/data/character'
import { deleteImage } from '@/utils/helpers/delete-image'
import db from '@/libs/db'

export const deleteCharacter = async (id: string) => {
  const currentAdminRole = await currentRole()

  if (currentAdminRole !== 'ADMIN' && currentAdminRole !== 'OWNER') {
    return {
      error: 'No tienes permisos para realizar esta acción.',
      status: 403
    }
  }

  try {
    const character = await getFullCharacterById(id)

    const talents = character?.talents
    const passives = character?.passives
    const constellations = character?.constellations

    const deleteImagePromises: any[] = []

    talents?.forEach((talent) => {
      deleteImagePromises.push(deleteImage({ path: 'talents', id: talent.id }))
    })

    passives?.forEach((passive) => {
      deleteImagePromises.push(
        deleteImage({ path: 'passives', id: passive.id })
      )
    })

    constellations?.forEach((constellation) => {
      deleteImagePromises.push(
        deleteImage({ path: 'constellations', id: constellation.id })
      )
    })

    await Promise.all(deleteImagePromises)

    await db.materialByAscension.deleteMany({ where: { characterId: id } })
    await db.ascensionByCharacter.deleteMany({ where: { characterId: id } })
    await db.characterByTeam.deleteMany({
      where: { OR: [{ characterId: id }, { characterItem: id }] }
    })
    await db.team.deleteMany({ where: { characterId: id } })
    await db.materialsByCharacter.deleteMany({ where: { characterId: id } })
    await db.weaponByCharacter.deleteMany({ where: { characterId: id } })
    await db.artifactByCharacter.deleteMany({ where: { characterId: id } })
    await db.artifactByCharacter.deleteMany({ where: { characterId: id } })
    await db.ascensionByCharacter.deleteMany({ where: { characterId: id } })
    await db.characterBestStat.deleteMany({ where: { characterId: id } })
    await db.videoGuide.deleteMany({ where: { characterId: id } })
    await db.characterBestStat.deleteMany({ where: { characterId: id } })
    await db.talentsByCharacter.deleteMany({ where: { characterId: id } })
    await db.passivesByCharacter.deleteMany({ where: { characterId: id } })
    await db.constellationsByCharacter.deleteMany({
      where: { characterId: id }
    })
    await db.character.delete({ where: { id } })

    return { message: 'Personaje eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el personaje.', status: 500 }
  }
}
