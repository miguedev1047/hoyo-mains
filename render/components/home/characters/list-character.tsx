'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { Character } from '@prisma/client'
import { CharacterListLoader } from '@/render/components/UI/loaders'
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

  if (isLoading) return <CharacterListLoader />
  if (error) return <CharacterListError />

  const filteredCharacters = homeFilterCharacter(filterStore, characters)

  return (
    <ul className='relative grid grid-cols-7 overflow-hidden gap-4 select-none'>
      {filteredCharacters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ul>
  )
}

export default ListCharacter
