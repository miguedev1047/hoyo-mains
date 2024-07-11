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

export const columns = [
  { name: 'RANGO', uid: 'rank' },
  { name: 'NIVEL', uid: 'level' },
  { name: 'COSTO', uid: 'cost' },
  { name: 'MATERIALES', uid: 'materials' },
  { name: 'ACCIONES', uid: 'actions' }
]
