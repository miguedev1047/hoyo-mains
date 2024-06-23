'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { HomeSkeletonCharacters } from '@/render/components/UI/skeletons'
import { Character } from '@prisma/client'
import ItemCharacter from '@/render/components/home/characters/item-character'
import CharacterListError from '@/render/components/UI/errors'
import useSWR from 'swr'

const ListCharacter = () => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters/list', fetcher)

  const filterStore = useFilterStore((state) => ({
    searchValue: state.searchValue,
    rarity: state.rarity,
    element: state.element,
    weapon: state.weapon
  }))

  if (isLoading) return <HomeSkeletonCharacters />
  if (error) return <CharacterListError />

  const filteredCharacters = homeFilterCharacter(filterStore, characters)

  return (
    <ul className='relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 overflow-hidden gap-4 select-none'>
      {filteredCharacters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ul>
  )
}

export default ListCharacter
