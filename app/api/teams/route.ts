import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const teams = await db.teamByCharacter.findMany({
      orderBy: [
        {
          order: 'asc'
        },
        {
          createdDate: 'asc'
        },
        {
          name: 'asc'
        },
      ],
      include: {
        characters: true
      }
    })

    return NextResponse.json(teams, { status: 200 })
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
