import { CharacterTypes } from '@/types'
import { fetcher } from '@/utils/helpers/fetcher'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/react'
import CharacterArtifacts from '@/render/components/home/characters/artifacts/character-artifacts'
import CharacterHeader from '@/render/components/home/characters/character-header'
import CharacterMaterials from '@/render/components/home/characters/materials/character-materials'
import CharacterBestStats from '@/render/components/home/characters/stats/character-best-stats'
import CharacterAscensionTable from '@/render/components/home/characters/table/character-ascension-table'
import CharacterSkillsTabs from '@/render/components/home/characters/tabs/character-skills-tabs'
import CharacterTeams from '@/render/components/home/characters/teams/character-teams'
import CharacterWeapons from '@/render/components/home/characters/weapons/character-weapons'
import CharacterVideo from '@/render/components/home/characters/yt/character-youtube'

const SectionCharacterHome = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  return (
    <section className='my-8'>
      <Card className='dark:bg-color-dark/50 py-4 px-1 sm:px-4 md:px-8'>
        <CardHeader>
          <CharacterHeader character={character} />
        </CardHeader>
        <Divider />
        <CardBody className='grid grid-cols-4 px-0 md:px-4 gap-12'>
          <CharacterAscensionTable character={character} />
          <Divider className='col-span-4' />
          <CharacterMaterials character={character} />
          <Divider className='col-span-4' />
          <CharacterWeapons character={character} />
          <Divider className='col-span-4 lg:hidden' />
          <CharacterArtifacts character={character} />
          <Divider className='col-span-4' />
          <CharacterBestStats character={character} />
          <Divider className='col-span-4' />
          <CharacterVideo character={character} />
          <Divider className='col-span-4' />
          <CharacterTeams character={character} />
          <Divider className='col-span-4' />
          <CharacterSkillsTabs character={character} />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionCharacterHome
