import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const teams = await db.team.findMany({
      orderBy: [
        {
          order: 'asc'
        },
        {
          name: 'asc'
        },
        {
          createdDate: 'asc'
        }
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
