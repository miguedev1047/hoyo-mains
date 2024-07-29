import { NextResponse } from 'next/server'
import db from '@/libs/db'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  try {
    const nameParams = new URL(request.url).searchParams.get('name')!
    const characterName = nameParams?.replace(/-/g, ' ')

    if (!characterName) {
      const characters = await db.character.findFirst({
        where: { name: characterName },
        include: {
          materials: {
            orderBy: {
              order: 'asc'
            }
          },
          weapons: {
            orderBy: {
              order: 'asc'
            }
          },
          artifacts: {
            orderBy: {
              order: 'asc'
            }
          },
          bestStats: true,
          videoGuide: true,
          teams: {
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
          },
          constellations: {
            orderBy: {
              createdDate: 'asc'
            }
          },
          ascensions: {
            orderBy: [{ level: 'asc' }, { cost: 'asc' }],
            include: {
              materials: {
                orderBy: {
                  order: 'asc'
                }
              }
            }
          }
        }
      })

      return NextResponse.json(characters, { status: 200 })
    }

    return redirect('/')
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
