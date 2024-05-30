import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const characters = await db.character.findMany({
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
        materials: true,
        weapons: true,
        artifacts: true,
        bestStats: true,
        characterVideo: true,
        characterTeams: {
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
        }
      }
    })

    return NextResponse.json(characters, { status: 200 })
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
