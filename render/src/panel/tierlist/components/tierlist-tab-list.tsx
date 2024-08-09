'use client'

import {
  NotFound,
  NotFoundTitle,
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { CharacterType, TierlistType } from '@/render/src/types'
import { Tabs, Tab, Spinner } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import TierTabList from '@/render/src/panel/tierlist/components/tier-tab-list'

interface TierlistTabListProps {
  tierlists: TierlistType[]
  characters: CharacterType[]
}
const TierlistTabList = ({ tierlists, characters }: TierlistTabListProps) => {
  const pathname = usePathname()
  const { replace } = useRouter()

  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const tierlistId = searchParams.get('id')

  useEffect(() => {
    if (!tierlistId) {
      params.set('id', tierlists[0].id)
      const q = params.toString()
      replace(`${pathname}?${q}`, { scroll: false })
    } else {
      params.delete('id')
    }
  }, [tierlists])

  if (!tierlists?.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron tierlists</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <Suspense
      fallback={
        <Spinner
          size='lg'
          color='primary'
        />
      }
    >
      <Tabs
          size='lg'
          aria-label='Tierlist Tabs'
          items={tierlists}
          selectedKey={tierlistId}
          classNames={{
            tabList: 'bg-color-darkest',
          }}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={item.name}
              href={`?id=${item.id}`}
            >
              <ol className='w-full'>
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
    </Suspense>
  )
}

export default TierlistTabList
