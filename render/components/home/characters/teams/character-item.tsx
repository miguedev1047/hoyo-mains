'use client'

import { HomeCharacterTeamError } from '@/render/components/UI/errors'
import { HomeCharacterTeamLoader } from '@/render/components/UI/loaders'
import { HomeSkeletonCharacterTeam } from '@/render/components/UI/skeletons'
import { Characters } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { Card, Image, Tooltip } from '@nextui-org/react'
import { CharacterByTeam } from '@prisma/client'
import Link from 'next/link'
import useSWR from 'swr'

const CharacterItem = ({
  characters: character
}: {
  characters: CharacterByTeam
}) => {
  const {
    data: dataCharacter,
    isLoading,
    error
  } = useSWR<Characters>(
    `/api/characters/character/${character.characterItem}`,
    fetcher
  )

  if (error) return <HomeCharacterTeamError />
  if (isLoading) return <HomeSkeletonCharacterTeam />

  const characterName = dataCharacter?.name.replace(/\s/g, '-').toLowerCase()
  const url = `/characters/character?name=${characterName}`

  return (
    <Tooltip
      placement='bottom'
      className='bg-color-light'
      content={
        <p className='text-color-darkest text-center font-bold capitalize'>
          {dataCharacter?.name}
        </p>
      }
    >
      <Link href={url}>
        <Card className='bg-color-dark'>
          <figure className='relative w-full h-auto aspect-square flex-none bg-primary-color rounded-md overflow-hidden'>
            <Image
              radius='sm'
              className='w-full h-full object-cover'
              src={dataCharacter?.imageUrl!}
              alt={dataCharacter?.name}
            />
          </figure>
        </Card>
      </Link>
    </Tooltip>
  )
}

export default CharacterItem
