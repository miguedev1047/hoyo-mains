import { Star1, Star2, Star3, Star4, Star5 } from '@/assets'

export const getWeaponStar = (star: number) => {
  switch (star) {
    case 1:
      return Star1.src
    case 2:
      return Star2.src
    case 3:
      return Star3.src
    case 4:
      return Star4.src
    case 5:
      return Star5.src
    default:
      return ''
  }
}
