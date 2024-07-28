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
  Star1,
  Star2,
  Star3,
  Star4,
  Star5,
  Sword
} from '@/assets'

export const elements = [
  {
    name: 'pyro',
    value: 'pyro',
    title: 'Pyro',
    icon: Pyro.src
  },
  {
    name: 'hydro',
    value: 'hydro',
    title: 'Hydro',
    icon: Hydro.src
  },
  {
    name: 'cryo',
    value: 'cryo',
    title: 'Cryo',
    icon: Cryo.src
  },
  {
    name: 'dendro',
    value: 'dendro',
    title: 'Dendro',
    icon: Dendro.src
  },
  {
    name: 'electro',
    value: 'electro',
    title: 'Electro',
    icon: Electro.src
  },
  {
    name: 'anemo',
    value: 'anemo',
    title: 'Anemo',
    icon: Anemo.src
  },
  {
    name: 'geo',
    value: 'geo',
    title: 'Geo',
    icon: Geo.src
  }
]

export const weapons = [
  {
    name: 'sword',
    value: 'sword',
    title: 'Espada',
    icon: Sword.src
  },
  {
    name: 'claymore',
    value: 'claymore',
    title: 'Mandoble',
    icon: Claymore.src
  },
  {
    name: 'polearm',
    value: 'polearm',
    title: 'Lanza',
    icon: Polearm.src
  },
  {
    name: 'catalyst',
    value: 'catalyst',
    title: 'Catalizador',
    icon: Catalyst.src
  },
  {
    name: 'bow',
    value: 'bow',
    title: 'Arco',
    icon: Bow.src
  }
]

export const stars = [
  { title: '5 Estrellas', name: 'five_star', value: '5', icon: Star5.src },
  { title: '4 Estrellas', name: 'four_star', value: '4', icon: Star4.src },
  { title: '3 Estrellas', name: 'three_star', value: '3', icon: Star3.src },
  { title: '2 Estrellas', name: 'two_star', value: '2', icon: Star2.src },
  { title: '1 Estrella', name: 'one_star', value: '1', icon: Star1.src }
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
  {
    title: 'Material de ascension',
    name: 'MATERIAL_UPGRADE',
    value: 'material_upgrade'
  },
  { title: 'Material local', name: 'MATERIAL_LOCAL', value: 'material_local' },
  {
    title: 'Material comun',
    name: 'MATERIAL_COMMON',
    value: 'material_common'
  },
  { title: 'Material de jefe', name: 'MATERIAL_BOSS', value: 'material_boss' },
  {
    title: 'Material de jefe semanal',
    name: 'MATERIAL_WEEKLY_BOSS',
    value: 'material_weekly_boss'
  },
  {
    title: 'Material de talento',
    name: 'MATERIAL_TALENT',
    value: 'material_talent'
  },
  {
    title: 'Mejora de arma',
    name: 'MATERIAL_UPGRADE_WEAPON',
    value: 'material_upgrade_weapon'
  },
  {
    title: 'Mejora de personaje',
    name: 'MATERIAL_UPGRADE_CHARACTER',
    value: 'material_upgrade_character'
  }
]

export const buttonFilters = {
  rarity: [
    { name: '5 Estrellas', value: '5', src: Star5.src },
    { name: '4 Estrellas', value: '4', src: Star4.src },
    { name: '3 Estrellas', value: '3', src: Star3.src },
    { name: '2 Estrellas', value: '2', src: Star2.src },
    { name: '1 Estrella', value: '1', src: Star1.src }
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

export const columns = [
  { name: 'RANGO', uid: 'rank' },
  { name: 'NIVEL', uid: 'level' },
  { name: 'COSTO', uid: 'cost' },
  { name: 'MATERIALES', uid: 'materials' },
  { name: 'ACCIONES', uid: 'actions' }
]

export const weaponColumns = [
  { name: 'ARMA', uid: 'weapon' },
  { name: 'TIPO', uid: 'type' },
  { name: 'ESTRELLAS', uid: 'stars' },
  { name: 'ATQ', uid: 'atk' },
  { name: 'ESTADISTICA PRINCIPAL', uid: 'main_stat' }
]

export const artifactColumns = [
  { name: 'ARTEFACTO', uid: 'name' },
  { name: 'ESTRELLAS', uid: 'stars' },
  { name: 'DESCRIPCION', uid: 'description' }
]

export const navigationItems = [
  { label: 'Personajes', href: '/characters' },
  { label: 'Equipos', href: '/teams' },
  { label: 'Builds', href: '/builds' },
  { label: 'Database', href: '/database' }
]
