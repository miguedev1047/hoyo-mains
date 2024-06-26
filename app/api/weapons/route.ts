import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const type = new URL(request.url).searchParams.get('type')?.toUpperCase()!

    if (type === 'all' || !type) {
      const weapons = await db.weapon.findMany({
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
        ]
      })
      return NextResponse.json(weapons, { status: 200 })
    }

    const weapons = await db.weapon.findMany({
      where: {
        type: type
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
      ]
    })

    console.log(weapons)

    return NextResponse.json(weapons, { status: 200 })
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
