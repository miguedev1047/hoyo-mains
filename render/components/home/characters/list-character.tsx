'use client'

import { AnimatePresence } from 'framer-motion'
import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { Character } from '@prisma/client'
import ItemCharacter from '@/render/components/home/characters/item-character'
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

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Error al cargar los datos</div>

  const filteredCharacters = homeFilterCharacter(filterStore, characters)

  return (
    <ul className='relative grid grid-cols-6 overflow-hidden gap-4 min-h-[230px]'>
       {filteredCharacters?.map((character) => (
          <ItemCharacter key={character.id} character={character} />
        ))}
    </ul>
  )
}

export default ListCharacter
