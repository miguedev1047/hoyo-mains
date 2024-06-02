import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const teams = await db.teamByCharacter.findUnique({
      where: {
        id: params.id
      },
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
