export const getWeapon = (weapon: string) => {
  if (weapon === 'sword') return 'Espada'
  if (weapon === 'claymore') return 'Mandoble'
  if (weapon === 'polearm') return 'Lanza'
  if (weapon === 'catalyst') return 'Catalizador'
  if (weapon === 'bow') return 'Arco'

  return 'Indefinido'
}
