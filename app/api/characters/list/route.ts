import { NextResponse } from 'next/server'
import db from '@/libs/db'

export async function GET(request: Request) {
  const characters = await db.character.findMany({
    where: {
      public: true
    },
    orderBy: [
      {
        isNew: 'desc'
      },
      {
        stars: 'desc'
      },
      {
        name: 'asc'
      },
      {
        createdDate: 'asc'
      }
    ]
  })

  return NextResponse.json(characters, { status: 200, statusText: 'OK' })
}
