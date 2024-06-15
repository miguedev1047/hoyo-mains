'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Tabs, Tab } from '@nextui-org/tabs'
import { Characters } from '@/types'
import CharacterMaterials from '@/render/components/panel/materials/character-materials'
import CharacterLoader from '@/render/components/UI/loaders/character-loader'
import AlertError from '@/render/components/UI/errors/alert-error'
import CharacterWeapons from '@/render/components/panel/weapons/character-weapons'
import CharacterArtifacts from '@/render/components/panel/artifacts/character-artifacts'
import CharacterBestStats from '@/render/components/panel/stats/character-best-stats'
import CharacterYoutube from '@/render/components/panel/yt/character-youtube'
import CharacterTalents from '@/render/components/panel/talents/character-talents'
import CharacterPassive from '@/render/components/panel/passive/character-passive'
import CharacterConstellations from '@/render/components/panel/constellations/character-constellations'
import CharacterTeams from '@/render/components/panel/teams/character-teams'
import CharacterAscension from '@/render/components/panel/ascensions/character-ascension'
import Configuration from '@/render/components/panel/config/configuration'
import CharacterHeader from '@/render/components/panel/characters/character-header'
import useSWR from 'swr'
import SkillsTabs from '@/render/components/UI/tabs/skills-tabs'
import InfoHeader from '@/render/components/panel/info-header'

const CharacterSection = ({ characterName }: { characterName: string }) => {
  const API_CHARACTERS = `/api/characters/character?name=${characterName}`

  const {
    data: character,
    isLoading,
    error
  } = useSWR<Characters>(API_CHARACTERS, fetcher)

  if (isLoading) return <CharacterLoader />

  if (error || !character)
    return (
      <AlertError
        className='h-[calc(100vh_-_64px)]'
        message='Hubo un problema al cargar el personaje.'
      />
    )

  return (
    <section className='space-y-4'>
      <InfoHeader title={character.name} />
      <Card className='dark:bg-color-dark/50 py-4 px-1 sm:px-4 md:px-8'>
        <CardHeader>
          <CharacterHeader character={character} />
        </CardHeader>
        <Divider />
        <CardBody className='grid grid-cols-4 px-0 md:px-4 gap-12'>
          <Configuration character={character} />
          <Divider className='col-span-4' />
          <CharacterAscension character={character} />
          <Divider className='col-span-4' />
          <CharacterMaterials character={character} />
          <Divider className='col-span-4' />
          <CharacterWeapons character={character} />
          <Divider className='col-span-4 lg:hidden' />
          <CharacterArtifacts character={character} />
          <Divider className='col-span-4' />
          <CharacterBestStats character={character} />
          <Divider className='col-span-4' />
          <CharacterYoutube character={character} />
          <Divider className='col-span-4' />
          <CharacterTeams character={character} />
          <Divider className='col-span-4' />
          <SkillsTabs character={character} />
          <Divider className='col-span-4' />
        </CardBody>
      </Card>
    </section>
  )
}

export default CharacterSection
