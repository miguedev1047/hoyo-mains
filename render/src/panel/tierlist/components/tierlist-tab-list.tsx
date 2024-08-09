'use client'

import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { CharacterType, TierlistType } from '@/render/src/types'
import { Tabs, Tab} from '@nextui-org/react'
import TierTabList from '@/render/src/panel/tierlist/components/tier-tab-list'

interface TierlistTabListProps {
  tierlists: TierlistType[]
  characters: CharacterType[]
}
const TierlistTabList = ({ tierlists, characters }: TierlistTabListProps) => {
  if (!tierlists?.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron tierlists</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <div>
      <Tabs aria-label='Tierlist Tabs' items={tierlists}>
        {(item) => (
          <Tab key={item.name} title={item.name}>
            <ol className='grid grid-cols-1 gap-2'>
              {tierlists.map((tierlist) => (
                <TierTabList
                  key={tierlist.id}
                  tierlists={tierlist}
                  characters={characters}
                />
              ))}
            </ol>
          </Tab>
        )}
      </Tabs>
    </div>
  )
}

export default TierlistTabList
