import {
  Anemo,
  Bow,
  Catalyst,
  Claymore,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Hydro,
  Polearm,
  Pyro,
  Sword
} from '@/assets'

export const elements = [
  {
    name: 'pyro',
    icon: Pyro.src
  },
  {
    name: 'hydro',
    icon: Hydro.src
  },
  {
    name: 'cryo',
    icon: Cryo.src
  },
  {
    name: 'dendro',
    icon: Dendro.src
  },
  {
    name: 'electro',
    icon: Electro.src
  },
  {
    name: 'anemo',
    icon: Anemo.src
  },
  {
    name: 'geo',
    icon: Geo.src
  }
]

export const weapons = [
  {
    name: 'sword',
    title: 'Espada',
    icon: Sword.src
  },
  {
    name: 'claymore',
    title: 'Mandoble',
    icon: Claymore.src
  },
  {
    name: 'polearm',
    title: 'Lanza',
    icon: Polearm.src
  },
  {
    name: 'catalyst',
    title: 'Catalizador',
    icon: Catalyst.src
  },
  {
    name: 'bow',
    title: 'Arco',
    icon: Bow.src
  }
]

export const raritys = [
  {
    name: 'five_star',
    number: 5,
    title: '5 Estrellas'
  },
  {
    name: 'four_star',
    number: 4,
    title: '4 Estrellas'
  },
  {
    name: 'three_star',
    number: 3,
    title: '3 Estrella'
  },
  {
    name: 'two_star',
    number: 2,
    title: '2 Estrellas'
  },
  {
    name: 'one_star',
    number: 1,
    title: '1 Estrella'
  }
]

export const role = [
  {
    name: 'dps',
    title: 'dps'
  },
  {
    name: 'sub_dps',
    title: 'sub dps'
  },
  {
    name: 'support',
    title: 'soporte'
  }
]

export const materialType = [
  { name: 'Material de ascension', id: 'MATERIAL_UPGRADE' },
  { name: 'Material local', id: 'MATERIAL_LOCAL' },
  { name: 'Material comun', id: 'MATERIAL_COMMON' },
  { name: 'Material de jefe', id: 'MATERIAL_BOSS' },
  { name: 'Material de jefe semanal', id: 'MATERIAL_WEEKLY_BOSS' },
  { name: 'Material de talento', id: 'MATERIAL_TALENT' },
  { name: 'Mejora de arma', id: 'MATERIAL_UPGRADE_WEAPON' },
  { name: 'Mejora de personaje', id: 'MATERIAL_UPGRADE_CHARACTER' }
]

export const materialItems = [
  {
    name: 'Todos',
    url: '/panel/materials'
  },
  {
    name: 'Materiales de ascension',
    url: '/panel/materials?type=material_upgrade'
  },
  {
    name: 'Material local',
    url: '/panel/materials?type=material_local'
  },
  {
    name: 'Material comun',
    url: '/panel/materials?type=material_common'
  },
  {
    name: 'Material de jefe',
    url: '/panel/materials?type=material_boss'
  },
  {
    name: 'Material de jefe semanal',
    url: '/panel/materials?type=material_weekly_boss'
  },
  {
    name: 'Material mejora de armas',
    url: '/panel/materials?type=material_upgrade_weapon'
  },
  {
    name: 'Material mejora de personaje',
    url: '/panel/materials?type=material_upgrade_character'
  }
]

export const weaponItems = [
  {
    name: 'Todos',
    url: '/panel/weapons'
  },
  {
    name: 'Arcos',
    url: '/panel/weapons?type=bow'
  },
  {
    name: 'Mandobles',
    url: '/panel/weapons?type=claymore'
  },
  {
    name: 'Lanzas',
    url: '/panel/weapons?type=polearm'
  },
  {
    name: 'Espadas',
    url: '/panel/weapons?type=sword'
  },
  {
    name: 'Catalizadores',
    url: '/panel/weapons?type=catalyst'
  }
]

export const stats = [
  { name: 'Prob. critica', id: 'PROB_CRIT' },
  { name: 'Daño critico', id: 'DMG_CRIT' },
  { name: 'Recarga de energia', id: 'ENERGY_RECHARGE' },
  { name: 'Atq.', id: 'ATQ' },
  { name: 'Vida', id: 'HP' },
  { name: 'Def.', id: 'DEF' },
  { name: 'Atq. porcentual', id: 'ATQ_PERCENTUAL' },
  { name: 'Vida porcentual', id: 'HP_PERCENTUAL' },
  { name: 'Def. porcentual', id: 'DEF_PERCENTUAL' }
]

export const weaponTypes = [
  { name: 'Espada', id: 'SWORD' },
  { name: 'Mandoble', id: 'CLAYMORE' },
  { name: 'Arco', id: 'BOW' },
  { name: 'Lanza', id: 'POLEARM' },
  { name: 'Catalizador', id: 'CATALYST' }
]
