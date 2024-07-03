'use client'

import { characterType } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import ItemBuild from '@/render/components/home/builds/item-build'
import useSWR from 'swr'

const ListBuilds = () => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<characterType[] | undefined>('/api/characters/builds', fetcher)

  const filterStore = useFilterStore((state) => ({
    searchValue: state.searchValue,
    rarity: state.rarity,
    element: state.element,
    weapon: state.weapon
  }))

  if (isLoading) return 'Loading...'
  if (error) return 'Error...'

  const filteredBuilds = homeFilterCharacter(
    filterStore,
    characters
  ) as characterType[]

  return (
    <ul className='relative grid grid-cols-1 overflow-hidden select-none'>
      {filteredBuilds?.map((build) => (
        <li key={build?.id}>
          <ItemBuild character={build} />
        </li>
      ))}
    </ul>
  )
}

export default ListBuilds
