'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Character } from '@prisma/client'
import useSWR from 'swr'
import ItemCharacters from '@/render/components/panel/characters/item-characters'

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
        {characters?.map((character) => (
          <ItemCharacters key={character.id} character={character} />
        ))}
      </ol>
    </section>
  )
}

export default CharactersSection
