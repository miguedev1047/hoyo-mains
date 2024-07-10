import {
  Anemo,
  ArtifactBackground,
  Bow,
  Catalyst,
  CharacterBackground,
  Claymore,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Hydro,
  MaterialBackground,
  Polearm,
  Pyro,
  Rarity4,
  Rarity5,
  Sword,
  WeaponBackground
} from '@/assets'

export const elements = [
  {
    name: 'pyro',
    title: 'Pyro',
    icon: Pyro.src
  },
  {
    name: 'hydro',
    title: 'Hydro',
    icon: Hydro.src
  },
  {
    name: 'cryo',
    title: 'Cryo',
    icon: Cryo.src
  },
  {
    name: 'dendro',
    title: 'Dendro',
    icon: Dendro.src
  },
  {
    name: 'electro',
    title: 'Electro',
    icon: Electro.src
  },
  {
    name: 'anemo',
    title: 'Anemo',
    icon: Anemo.src
  },
  {
    name: 'geo',
    title: 'Geo',
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
    title: '3 Estrellas'
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
    url: '/panel/weapons',
    icon: null
  },
  {
    name: 'Arcos',
    url: '/panel/weapons?type=bow',
    icon: Bow.src
  },
  {
    name: 'Mandobles',
    url: '/panel/weapons?type=claymore',
    icon: Claymore.src
  },
  {
    name: 'Lanzas',
    url: '/panel/weapons?type=polearm',
    icon: Polearm.src
  },
  {
    name: 'Espadas',
    url: '/panel/weapons?type=sword',
    icon: Sword.src
  },
  {
    name: 'Catalizadores',
    url: '/panel/weapons?type=catalyst',
    icon: Catalyst.src
  }
]

export const stats = [
  { name: 'Prob. critica', id: 'PROB_CRIT' },
  { name: 'Daño critico', id: 'DMG_CRIT' },
  { name: 'Recarga de energia', id: 'ENERGY_RECHARGE' },
  { name: 'Maestria elemental', id: 'ELEMENTAL_MASTERY' },
  { name: 'Atq. porcentual', id: 'ATQ_PERCENTUAL' },
  { name: 'Vida porcentual', id: 'HP_PERCENTUAL' },
  { name: 'Def. porcentual', id: 'DEF_PERCENTUAL' },
  { name: 'Atq. plano', id: 'ATQ_FLAT' },
  { name: 'Vida plano', id: 'HP_FLAT' },
  { name: 'Def. plano', id: 'DEF_FLAT' }
]

export const weaponTypes = [
  { name: 'Espada', id: 'SWORD', icon: Sword.src },
  { name: 'Mandoble', id: 'CLAYMORE', icon: Claymore.src },
  { name: 'Arco', id: 'BOW', icon: Bow.src },
  { name: 'Lanza', id: 'POLEARM', icon: Polearm.src },
  { name: 'Catalizador', id: 'CATALYST', icon: Catalyst.src }
]

export const borderColorStars = {
  1: 'border-gray-500',
  2: 'border-green-500',
  3: 'border-blue-500',
  4: 'border-purple-500',
  5: 'border-yellow-500'
}

export const homeItems = [
  {
    title: 'Personajes',
    url: '/panel/characters',
    background: CharacterBackground.src
  },
  {
    title: 'Armas',
    url: '/panel/weapons',
    background: ArtifactBackground.src
  },
  {
    title: 'Artefactos',
    url: '/panel/artifacts',
    background: WeaponBackground.src
  },
  {
    title: 'Materiales',
    url: '/panel/materials',
    background: MaterialBackground.src
  }
]

export const columns = [
  { name: 'RANGO', uid: 'rank' },
  { name: 'NIVEL', uid: 'level' },
  { name: 'COSTO', uid: 'cost' },
  { name: 'MATERIALES', uid: 'materials' },
  { name: 'ACCIONES', uid: 'actions' }
]

export const columnsHome = [
  { name: 'RANGO', uid: 'rank' },
  { name: 'NIVEL', uid: 'level' },
  { name: 'COSTO', uid: 'cost' },
  { name: 'MATERIALES', uid: 'materials' }
]

export const navigationItems = [
  { label: 'Personajes', href: '/characters' },
  { label: 'Equipos', href: '/teams' },
  { label: 'Builds', href: '/builds' },
  { label: 'Database', href: '/database' }
]

export const buttonFilters = {
  rarity: [
    { name: '5 Estrellas', value: '5', src: Rarity5.src },
    { name: '4 Estrellas', value: '4', src: Rarity4.src }
  ],
  elements: [
    { name: 'Pyro', value: 'pyro', src: Pyro.src },
    { name: 'Hydro', value: 'hydro', src: Hydro.src },
    { name: 'Cryo', value: 'cryo', src: Cryo.src },
    { name: 'Dendro', value: 'dendro', src: Dendro.src },
    { name: 'Electro', value: 'electro', src: Electro.src },
    { name: 'Anemo', value: 'anemo', src: Anemo.src },
    { name: 'Geo', value: 'geo', src: Geo.src }
  ],
  weapons: [
    { name: 'Espada', value: 'sword', src: Sword.src },
    { name: 'Mandoble', value: 'claymore', src: Claymore.src },
    { name: 'Lanza', value: 'polearm', src: Polearm.src },
    { name: 'Catalizador', value: 'catalyst', src: Catalyst.src },
    { name: 'Arco', value: 'bow', src: Bow.src }
  ]
}
