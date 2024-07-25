export const getWeaponStat = (stat: string) => {
  switch (stat) {
    case 'PROB_CRIT':
      return 'Prob. critica'
    case 'DMG_CRIT':
      return 'Daño critico'
    case 'ENERGY_RECHARGE':
      return 'Recarga de energia'
    case 'ELEMENTAL_MASTERY':
      return 'Maestria elemental'
    case 'ATQ_PERCENTUAL':
      return 'Atq. porcentual'
    case 'HP_PERCENTUAL':
      return 'Vida porcentual'
    case 'DEF_PERCENTUAL':
      return 'Def. porcentual'
    case 'ATQ_FLAT':
      return 'Atq. plano'
    case 'HP_FLAT':
      return 'Vida plana'
    case 'DEF_FLAT':
      return 'Def. plana'
  }
}
