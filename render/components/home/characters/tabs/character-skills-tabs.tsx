'use client'

import { characterType } from '@/render/services/home/characters/data'
import { Tab, Tabs } from '@nextui-org/react'
import CharacterTalentList from '@/render/components/home/characters/talents/character-talent-list'
import CharacterPassiveList from '@/render/components/home/characters/passives/character-passive-list'
import CharacterConstellationList from '@/render/components/home/characters/constellations/character-constellation-list'

const CharacterSkillsTabs = ({ character }: { character: characterType }) => {
  return (
    <div className='col-span-4 w-full'>
      <Tabs
        size='lg'
        classNames={{
          tabList: 'bg-color-darkest'
        }}
        aria-label='skills'
      >
        <Tab key='talents' title='Talentos'>
          <CharacterTalentList character={character} />
        </Tab>
        <Tab key='passives' title='Pasivas'>
          <CharacterPassiveList character={character} />
        </Tab>
        <Tab key='constellations' title='Constelaciones'>
          <CharacterConstellationList character={character} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default CharacterSkillsTabs
