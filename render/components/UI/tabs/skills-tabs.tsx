import { Characters } from '@/types'
import { Tab, Tabs } from '@nextui-org/react'
import CharacterTalents from '@/render/components/panel/talents/character-talents'
import CharacterPassive from '@/render/components/panel/passive/character-passive'
import CharacterConstellations from '@/render/components/panel/constellations/character-constellations'

const SkillsTabs = ({ character }: { character: Characters | undefined }) => {
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
          <CharacterTalents character={character} />
        </Tab>
        <Tab key='passives' title='Pasivas'>
          <CharacterPassive character={character} />
        </Tab>
        <Tab key='constellations' title='Constelaciones'>
          <CharacterConstellations character={character} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default SkillsTabs
