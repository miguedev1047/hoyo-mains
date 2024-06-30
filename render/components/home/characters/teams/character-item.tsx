'use client'

import { HomeCharacterTeamError } from '@/render/components/UI/errors'
import { HomeSkeletonCharacterTeam } from '@/render/components/UI/skeletons'
import { Characters } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { Card, Image, Tooltip } from '@nextui-org/react'
import { CharacterByTeam } from '@prisma/client'
import Figure from '@/render/components/UI/misc/figure'
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
        <Card className='bg-color-dark aspect-square select-none'>
          <Figure
            radius='rounded-sm'
            padding='p-0'
            width='w-full'
            height='h-full'
          >
            <Image
              radius='sm'
              className='w-full h-full object-cover'
              src={dataCharacter?.imageUrl!}
              alt={dataCharacter?.name}
            />
          </Figure>
        </Card>
      </Link>
    </Tooltip>
  )
}

export default CharacterItem
