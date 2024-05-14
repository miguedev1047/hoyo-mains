'use server'

interface Props {
  path: string
  id: string
  imgUrl: string
}

import db from '../../libs/db'

export const uploadImage = async ({
  path: path,
  id: id,
  imgUrl: downloadUrl
}: Props) => {
  try {
    switch (path) {
      case 'characters':
        return await db.character.update({
          where: {
            id: id
          },
          data: {
            imageUrl: downloadUrl
          }
        })

      case 'materials':
        return await db.material.update({
          where: {
            id: id
          },
          data: {
            imageUrl: downloadUrl
          }
        })
      default:
        break
    }

    return { success: 'Image updated!', status: 200 }
  } catch (error) {
    return { error: 'An ocurred a error.', status: 500 }
  }
}
