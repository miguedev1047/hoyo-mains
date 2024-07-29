'use client'

import { Card } from '@nextui-org/card'
import { Character, CharacterByTeam } from '@prisma/client'
import { Figure } from '@/render/src/shared/components/figure'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Image, Tooltip } from '@nextui-org/react'
import { SkeletonSquare } from '@/render/src/shared/components/skeleton'
import Link from 'next/link'

interface CharacterItemProps {
  character: CharacterByTeam
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const {
    data: fetchedCharacter,
    isLoading,
    error
  } = useFetch<Character>(`/api/characters/character/${character.characterId}`)

  const characterName = fetchedCharacter?.name.replace(/\s/g, '-').toLowerCase()
  const url = `/character?name=${characterName}`

  if (isLoading) return <SkeletonSquare className='max-md:rounded-md' />
  if (error) return <SkeletonSquare className='max-md:rounded-md' />

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
        <Card className='bg-color-dark aspect-square select-none max-md:rounded-md'>
          <Figure size='full'>
            <Image
              className='w-full h-full object-cover rounded-none'
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
