'use server'

import { currentRole } from '@/data/auth'
import { getFullCharacterById } from '@/data/character'
import db from '@/libs/db'
import { deleteImage } from '@/render/src/shared/utilities/helpers/delete-image'

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

    if (!character) {
      return {
        error: 'Personaje no encontrado.',
        status: 404
      }
    }

    const { talents, passives, constellations } = character

    // Reunir todas las promesas de eliminación de imágenes en una sola lista
    const deleteImagePromises = [
      ...(talents?.map((talent) =>
        deleteImage({ path: 'talents', id: talent.id })
      ) || []),
      ...(passives?.map((passive) =>
        deleteImage({ path: 'passives', id: passive.id })
      ) || []),
      ...(constellations?.map((constellation) =>
        deleteImage({ path: 'constellations', id: constellation.id })
      ) || [])
    ]

    await Promise.all(deleteImagePromises)

    const deleteOperations = [
      db.materialByAscension.deleteMany({ where: { characterId: id } }),
      db.ascensionByCharacter.deleteMany({ where: { characterId: id } }),
      db.characterByTeam.deleteMany({
        where: { OR: [{ characterId: id }, { characterItem: id }] }
      }),
      db.teamByCharacter.deleteMany({ where: { characterId: id } }),
      db.materialsByCharacter.deleteMany({ where: { characterId: id } }),
      db.weaponByCharacter.deleteMany({ where: { characterId: id } }),
      db.artifactByCharacter.deleteMany({ where: { characterId: id } }),
      db.ascensionByCharacter.deleteMany({ where: { characterId: id } }),
      db.statsByCharacter.deleteMany({ where: { characterId: id } }),
      db.videoGuideByCharacter.deleteMany({ where: { characterId: id } }),
      db.talentsByCharacter.deleteMany({ where: { characterId: id } }),
      db.passivesByCharacter.deleteMany({ where: { characterId: id } }),
      db.constellationsByCharacter.deleteMany({ where: { characterId: id } }),
      db.character.delete({ where: { id } })
    ]

    await Promise.all(deleteOperations)

    return { message: 'Personaje eliminado.', status: 201 }
  } catch (error) {
    return { error: 'Error al eliminar el personaje.', status: 500 }
  }
}
