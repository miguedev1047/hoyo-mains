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
  Rarity3,
  Rarity4,
  Rarity5,
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
    name: 'three_star',
    number: 3,
    title: '3 Estrella',
    icon: Rarity3.src
  },
  {
    name: 'four_star',
    number: 4,
    title: '4 Estrellas',
    icon: Rarity4.src
  },
  {
    name: 'five_star',
    number: 5,
    title: '5 Estrellas',
    icon: Rarity5.src
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

export const starColorMap = {
  5: 'bg-gradient-to-b to bg-yellow-500 from-yellow-800',
  4: 'bg-gradient-to-b to-purple-500 from-purple-800',
  3: 'bg-gradient-to-b to-blue-500 from-blue-800',
  2: 'bg-gradient-to-b to-green-500 from-green-800',
  1: 'bg-gradient-to-b to-gray-500 from-gray-800'
}
