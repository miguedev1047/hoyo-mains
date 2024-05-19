import { Artifact, Character, Material, Weapon } from '@prisma/client'

export type ExtendedCharacter = Character & {
  weapons: Weapon[]
  materials: Material[]
  artifacts: Artifact[]
}

export interface Characters {
  id: string
  name: string
  element: string
  weapon: string
  stars: number
  starsText: string
  role: string
  imageUrl: string
  public: boolean
  createdDate: Date
  updatedDate: Date
  weapons: Data[]
  materials: Data[]
  artifacts: Data[]
  team: Team[]
  substats: Substats
}

export interface Data {
  id: string
  item: string
  characterId: string | null
  order: number
  
  createdDate: Date
  updatedDate: Date
}

export interface Substats {
  id: string
  characterId: string
  sandStat: string
  globetStat: string
  circletStat: string
  substatPriority: string
  createdDate: Date
  updatedDate: Date
}

export interface Team {
  id: string
  characterId: string
  order: number
  name: string
  createdDate: Date
  updatedDate: Date
  characters: MaterialsByCharacter[]
}

export interface MaterialsByCharacter {
  id: string
  item: string
  characterId: string
  order: number
  createdDate: Date
  updatedDate: Date
}
