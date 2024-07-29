'use client'

import { Tab, Tabs } from '@nextui-org/react'
import { CharacterType } from '@/render/src/types'
import TalentList from '@/render/src/character/components/skills/talents/talent-list'
import PassiveList from '@/render/src/character/components/skills/passives/passive-list'
import ConstellationList from '@/render/src/character/components/skills/constellations/constellation-list'

interface SkillsProps {
  character: CharacterType
}

const Skills = ({ character }: SkillsProps) => {
  return (
    <div className='col-span-4 w-full'>
      <Tabs
        size='lg'
        classNames={{
          tabList: 'bg-color-darkest max-md:rounded-md',
          cursor: 'max-md:rounded-md'
        }}
        aria-label='skills'
      >
        <Tab key='talents' title='Talentos'>
          <TalentList character={character} />
        </Tab>
        <Tab key='passives' title='Pasivas'>
          <PassiveList character={character} />
        </Tab>
        <Tab key='constellations' title='Constelaciones'>
          <ConstellationList character={character} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default Skills
