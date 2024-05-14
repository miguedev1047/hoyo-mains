import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET(request: Request) {
  try {
    const characters = await db.character.findMany()

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
