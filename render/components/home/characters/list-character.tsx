'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { Card } from '@nextui-org/card'
import { Image, Tooltip } from '@nextui-org/react'
import { Character } from '@prisma/client'
import clsx from 'clsx'
import useSWR from 'swr'
import ItemCharacter from './item-character'

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

  return (
    <ul className='grid grid-cols-6 gap-4'>
      {filteredCharacters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ul>
  )
}

export default ListCharacter
