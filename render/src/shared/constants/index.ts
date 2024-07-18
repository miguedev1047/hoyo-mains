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


export const columns = [
  { name: 'RANGO', uid: 'rank' },
  { name: 'NIVEL', uid: 'level' },
  { name: 'COSTO', uid: 'cost' },
  { name: 'MATERIALES', uid: 'materials' },
  { name: 'ACCIONES', uid: 'actions' }
]

export const buttonFilters = {
  rarity: [
    { name: '5 Estrellas', value: '5', src: Star5.src },
    { name: '4 Estrellas', value: '4', src: Star4.src }
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
