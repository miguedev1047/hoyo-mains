'use server'

import db from '@/libs/db'

interface FetchArtifactsProps {
  name: string
}

export const fetchArtifacts = async ({ name }: FetchArtifactsProps) => {
  try {
    if (name) {
      const artifacts = await db.artifact.findMany({
        where: {
          name: {
            contains: name
          }
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

      return artifacts
    }

    const artifacts = await db.artifact.findMany({
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

    return artifacts
  } catch (error) {
    return null
  }
}
