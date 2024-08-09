'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { CharacterTierType, CharacterType } from '@/render/src/types'
import { Card, Image } from '@nextui-org/react'

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

  if (error) return 'error'
  if (isLoading) return 'Loading...'

  return (
    <Card className='bg-color-dark aspect-square select-none max-md:rounded-md'>
      <Figure size='full'>
        <Image
          className='w-full h-full object-cover rounded-none'
          src={fetchedCharacter?.imageUrl!}
          alt={fetchedCharacter?.name}
        />
      </Figure>
    </Card>
  )
}

export default CharacterItem
