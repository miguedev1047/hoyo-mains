'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { characterType } from '@/types'
import { homeFilterCharacter } from '@/utils/helpers/filter-character'
import { useFilterStore } from '@/utils/store/use-filter'
import { ItemCardComponent } from '@/render/components/home/builds/card/item-card-build'
import { BuildSkeletonCharacters } from '@/render/components/UI/skeletons'
import { BuildErrorList } from '@/render/components/UI/errors'
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

  if (isLoading) return <BuildSkeletonCharacters />
  if (error) return <BuildErrorList />

  const filteredBuilds = homeFilterCharacter(
    filterStore,
    characters
  ) as characterType[]

  return (
    <ul className='relative grid grid-cols-1 gap-4 overflow-hidden select-none'>
      {filteredBuilds?.map((build) => (
        <li key={build?.id}>
          <ItemCardComponent character={build} />
        </li>
      ))}
    </ul>
  )
}

export default ListBuilds
