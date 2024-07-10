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
