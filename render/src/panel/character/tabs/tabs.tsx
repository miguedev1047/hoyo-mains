'use client'

import { CharacterType } from '@/render/src/types'
import { Tabs, Tab } from '@nextui-org/react'
import Talents from '@/render/src/panel/character/tabs/talents/talents'
import Passives from '@/render/src/panel/character/tabs/passives/passives'

interface TabContainerProps {
  character: CharacterType
}

const TabContainer = ({ character }: TabContainerProps) => {
  return (
    <div className='flex col-span-4 flex-col'>
      <Tabs
        size='lg'
        aria-label='Skills'
        classNames={{
          tabList: 'bg-color-darkest'
        }}
      >
        <Tab key='Talents' title='Talentos'>
          <Talents character={character} />
        </Tab>
        <Tab key='Passives' title='Pasivas'>
          <Passives character={character} />
        </Tab>
        <Tab key='Constellations' title='Constelacion'>
          ...
        </Tab>
      </Tabs>
    </div>
  )
}

export default TabContainer
