'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { Character } from '@prisma/client'
import useSWR from 'swr'

const ListCharacter = () => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters', fetcher)

  const filterStore = useFilterStore((state) => ({
    searchValue: state.searchValue,
    rarity: state.rarity,
    element: state.element,
    weapon: state.weapon
  }))

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar los datos</div>

  const filteredCharacters = homeFilterCharacter(filterStore, characters)
  
  return <ol>
    {filteredCharacters?.map((char) => (
      <li key={char.id}>{char.name}</li>
    ))}
  </ol>
}

export default ListCharacter
