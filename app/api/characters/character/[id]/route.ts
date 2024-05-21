import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const characterId = params.id

    const characters = await db.character.findUnique({
      where: { id: characterId },
      include: {
        materials: true,
        weapons: true,
        artifacts: true,
        bestStats: true
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
