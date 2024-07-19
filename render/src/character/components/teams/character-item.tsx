'use client'

import { Characters } from '@/types'
import { Card, Image, Tooltip } from '@nextui-org/react'
import { CharacterByTeam } from '@prisma/client'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import Link from 'next/link'
import { SkeletonSquare } from '@/render/src/shared/components/skeleton'

interface CharacterItemProps {
  character: CharacterByTeam
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const {
    data: fetchedCharacter,
    isLoading,
    error
  } = useFetch<Characters>(
    `/api/characters/character/${character.characterItem}`
  )

  if (error) return <SkeletonSquare size='full' />
  if (isLoading) return <SkeletonSquare size='full' />

  const characterName = fetchedCharacter?.name.replace(/\s/g, '-').toLowerCase()
  const url = `/characters/character?name=${characterName}`

  return (
    <Tooltip
      placement='bottom'
      className='bg-color-light'
      content={
        <p className='text-color-darkest text-center font-bold capitalize'>
          {fetchedCharacter?.name}
        </p>
      }
    >
      <Link href={url}>
        <Card className='bg-color-dark aspect-square select-none'>
          <Figure size='full'>
            <Image
              className='w-full h-full object-cover'
              src={fetchedCharacter?.imageUrl!}
              alt={fetchedCharacter?.name}
            />
          </Figure>
        </Card>
      </Link>
    </Tooltip>
  )
}

export default CharacterItem
