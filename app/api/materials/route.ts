import { NextResponse } from 'next/server'
import db from '@/libs/db'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const type = new URL(request.url).searchParams.get('type')?.toUpperCase()!

    if (type === 'all' || !type) {
      const materials = await db.material.findMany({
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
      return NextResponse.json(materials, { status: 200 })
    }

    const materials = await db.material.findMany({
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

    return NextResponse.json(materials, { status: 200 })
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
