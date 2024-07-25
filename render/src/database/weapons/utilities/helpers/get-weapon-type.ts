import { Bow, Catalyst, Claymore, Polearm, Sword } from '@/assets'

export const getWeaponType = (type: string) => {
  const weaponType = type.toLowerCase()

  switch (weaponType) {
    case 'sword':
      return Sword.src
    case 'claymore':
      return Claymore.src
    case 'polearm':
      return Polearm.src
    case 'bow':
      return Bow.src
    case 'catalyst':
      return Catalyst.src
    default:
      return ''
  }
}

export const getWeaponTypeAlt = (type: string) => {
  const weaponType = type.toLowerCase()

  switch (weaponType) {
    case 'sword':
      return 'Espada'
    case 'claymore':
      return 'Mandoble'
    case 'polearm':
      return 'Lanza'
    case 'bow':
      return 'Arco'
    case 'catalyst':
      return 'Catalizador'
    default:
      return ''
  }
}
