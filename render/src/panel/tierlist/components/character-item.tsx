'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonSquare } from '@/render/src/shared/components/skeleton'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { CharacterTierType, CharacterType } from '@/render/src/types'
import { Card, Image, Tooltip } from '@nextui-org/react'

interface Character {
  character: CharacterTierType
}

const CharacterItem = ({ character }: Character) => {
  const {
    data: fetchedCharacter,
    isLoading,
    error,
  } = useFetch<CharacterType>(
    `/api/characters/character/${character.characterId}`
  )

  if (error) return <SkeletonSquare />
  if (isLoading) return <SkeletonSquare />

  return (
    <Tooltip
      className='bg-color-light text-color-darkest px-8'
      placement='bottom'
      content={
        <p className='font-medium capitalize'>{fetchedCharacter?.name}</p>
      }
    >
      <Card className='bg-color-dark aspect-square select-none max-md:rounded-md'>
        <Figure size='full'>
          <Image
            className='w-full h-full object-cover rounded-none'
            src={fetchedCharacter?.imageUrl!}
            alt={fetchedCharacter?.name}
          />
        </Figure>
      </Card>
    </Tooltip>
  )
}

export default CharacterItem
