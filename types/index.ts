import { Artifact, Character, Material, Prisma, Weapon } from '@prisma/client'

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
  isNew: boolean
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
  constellations: CharacterConstellations[]
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
  characterId: string | null
  order: number
  name: string
  createdDate: Date
  updatedDate: Date
  characters: CharactersByTeam[]
}

export interface CharactersByTeam {
  id: string
  characterId: string | null
  characterItem: string | null
  teamId: string
  order: number
  createdDate: Date
  updatedDate: Date
}

export interface CharacterTalents {
  id: string
  characterId: string | null
  name: string
  description: string
  imageUrl: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

export interface CharacterPassives {
  id: string
  characterId: string | null
  name: string
  description: string
  imageUrl: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

export interface CharacterConstellations {
  id: string
  characterId: string | null
  name: string
  description: string
  imageUrl: string | null
  order: number
  createdDate: Date
  updatedDate: Date
}

export interface Ascension {
  id: string
  characterId: string
  ascensionId: string
  index: number
  rank: number
  level: number
  cost: number
  materials: MaterialByAscension[]
}

export interface MaterialByAscension {
  id: string
  materialId: string
  ascensionId: string
  quantity: number
}

export type CharacterTypes = Prisma.CharacterGetPayload<{
  include: {
    materials: true
    weapons: true
    artifacts: true
    bestStats: true
    videoGuide: true
    teams: {
      include: {
        characters: true
      }
    }
    talents: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    passives: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    constellations: {
      orderBy: {
        createdDate: 'asc'
      }
    }
    ascensions: {
      orderBy: [{ level: 'asc' }, { cost: 'asc' }]
      include: {
        materials: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    }
  }
}>

export type BestTeamType = Prisma.BestTeamGetPayload<{
  include: { characters: true }
}>

export interface SearchParamsTypes {
  searchParams: {
    character: string
    element?: string
    stars?: string
    weapon?: string
  }
}

export interface DragTypes {
  item: Array<any>
  name: string
  callback: (items: Array<any>) => Promise<any>
}
