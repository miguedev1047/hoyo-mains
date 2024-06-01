import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const characterId = params.id

    const ascension = await db.ascensionByCharacter.findMany({
      where: { characterId },
      include: {
        materials: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    return NextResponse.json(ascension, { status: 200 })
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
