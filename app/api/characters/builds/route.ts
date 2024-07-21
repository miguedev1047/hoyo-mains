import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const builds = await db.character.findMany({
      where: {
        public: true
      },
      orderBy: [
        {
          stars: 'desc'
        },
        {
          name: 'asc'
        },
        {
          createdDate: 'asc'
        }
      ],
      include: {
        materials: {
          orderBy: {
            order: 'asc'
          }
        },
        weapons: {
          orderBy: {
            order: 'asc'
          }
        },
        artifacts: {
          orderBy: {
            order: 'asc'
          }
        },
        bestStats: true,
        videoGuide: true,
        teams: {
          include: {
            characters: true
          }
        },
        talents: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        passives: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        constellations: {
          orderBy: {
            createdDate: 'asc'
          }
        },
        ascensions: {
          orderBy: [{ level: 'asc' }, { cost: 'asc' }],
          include: {
            materials: {
              orderBy: {
                order: 'asc'
              }
            }
          }
        }
      }
    })

    return NextResponse.json(builds, { status: 200 })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Ha ocurrido un error.',
        message: error.message
      },
      { status: 500 }
    )
  }
}
