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
  teams: Team[]
  videoGuide: videoGuides
  bestStats: BestStats
  talents: CharacterTalents[]
  passives: CharacterPassives[]
  constellations: Constellations[]
  ascensions: Ascension[]
}

export interface Data {
  id: string
  item: string
  characterId: string | null
  order: number

  createdDate: Date
  updatedDate: Date
}

export interface videoGuides {
  id: string
  embedVideoUrl: string
  youtuberChannel: string
  youtuberName: string
  characterId: string
}

export interface BestStats {
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
  characters: CharactersByTeam[]
}

export interface CharactersByTeam {
  id: string
  characterId: string | null
  teamId: string
  order: number
  createdDate: Date
  updatedDate: Date
}

export interface CharacterTalents {
  id: string
  characterId: string
  order: number
  name: string
  createdDate: Date
  updatedDate: Date
  description?: string
  imageUrl?: string
}

export interface CharacterPassives {
  id: string
  characterId: string
  order: number
  name: string
  createdDate: Date
  updatedDate: Date
  description?: string
  imageUrl?: string
}

export interface Constellations {
  id: string
  characterId: string
  order: number
  name: string
  createdDate: Date
  updatedDate: Date
  description?: string
  imageUrl?: string
}

export interface Ascension {
  id: string
  characterId: string
  ascensionId: string
  rank: number
  level: number
  cost: number
  materials: MaterialByAscension[]
}

export interface MaterialByAscension {
  id: string,
  materialId: string,
  ascensionId: string,
  quantity: number,
}