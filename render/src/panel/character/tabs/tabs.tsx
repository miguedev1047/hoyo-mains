'use client'

import { CharacterType } from '@/render/src/types'
import { Tabs, Tab } from '@nextui-org/react'
import Talents from '@/render/src/panel/character/tabs/talents/talents'
import Passives from '@/render/src/panel/character/tabs/passives/passives'
import Constellations from '@/render/src/panel/character/tabs/constellations/constellations'

interface TabSkillsProps {
  character: CharacterType
}

const TabSkills = ({ character }: TabSkillsProps) => {
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
          <Constellations character={character} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default TabSkills
