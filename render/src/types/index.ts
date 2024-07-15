import { Prisma } from '@prisma/client'

export type CharacterType = Prisma.CharacterGetPayload<{
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

export type MaterialItemType = Prisma.MaterialsByCharacterGetPayload<{
  include: {
    character: true
  }
}>

export type WeaponItemType = Prisma.WeaponByCharacterGetPayload<{
  include: {
    character: true
  }
}>

export type TeamItemType = Prisma.TeamByCharacterGetPayload<{
  include: {
    characters: true
    character: true
  }
}>

export type TeamCharacterItemType = Prisma.CharacterByTeamGetPayload<{
  include: {
    characters: true
  }
}>

export type TalentsType = Prisma.TalentsByCharacterGetPayload<{
  include: {
    talents: true
  }
}>
