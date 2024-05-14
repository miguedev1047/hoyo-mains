'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Tooltip } from '@nextui-org/tooltip'
import { Image } from '@nextui-org/image'
import { Character } from '@prisma/client'
import { starColorMap } from '@/constants'
import useSWR from 'swr'
import Link from 'next/link'

const CharactersSection = () => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters', fetcher)

  if (error) return <div>Error loading characters</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <section className='space-y-4'>
      <ol className='w-full grid grid-cols-8 gap-4'>
        {characters?.map((character) => {
          const url = '/panel/characters/character/' + character.id

          return (
            <Link href={url} key={character.id}>
              <Tooltip
                className='bg-color-light text-color-darkest px-8'
                placement='bottom'
                content={
                  <p className='font-medium capitalize'>{character.name}</p>
                }
              >
                <Image
                  isBlurred
                  isZoomed
                  className={
                    starColorMap[
                      character.stars as keyof typeof starColorMap
                    ] || 'bg-gradient-to-t to-gray-500 from-gray-600'
                  }
                  src={character.imageUrl!}
                  alt={character.name}
                  height={200}
                  width={200}
                />
              </Tooltip>
            </Link>
          )
        })}
      </ol>
    </section>
  )
}

export default CharactersSection
