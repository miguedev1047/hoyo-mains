'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Divider } from '@nextui-org/divider'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
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
import useSWR from 'swr'
import Configuration from '@/render/components/panel/config/configuration'
import CharacterHeader from '@/render/components/panel/character-header'

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
    <section>
      <Card className='dark:bg-color-dark/50 py-4 px-32'>
        <CardHeader>
          <CharacterHeader character={character} />
        </CardHeader>
        <Divider />
        <CardBody className='grid grid-cols-4 gap-12'>
          <CharacterMaterials character={character} />
          <Divider className='col-span-4' />
          <CharacterWeapons character={character} />
          <CharacterArtifacts character={character} />
          <Divider className='col-span-4' />
          <CharacterBestStats character={character} />
          <Divider className='col-span-4' />
          <CharacterYoutube character={character} />
          <Divider className='col-span-4' />
          <CharacterTeams character={character} />
          <Divider className='col-span-4' />
          <CharacterTalents character={character} />
          <Divider className='col-span-4' />
          <CharacterPassive character={character} />
          <Divider className='col-span-4' />
          <CharacterConstellations character={character} />
          <Divider className='col-span-4' />
          <CharacterAscension character={character} />
        </CardBody>
        <Divider />
        <CardFooter>
          <Configuration character={character} />
        </CardFooter>
      </Card>
    </section>
  )
}

export default CharacterSection
