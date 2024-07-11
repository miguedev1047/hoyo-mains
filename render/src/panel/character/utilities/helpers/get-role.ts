export function getRole (role: string) {
  if (role === 'dps') return 'Main DPS'
  if (role === 'sub_dps') return 'Sub DPS'
  if (role === 'support') return 'Soporte'

  return 'Indefinido'
}
