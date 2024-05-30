'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { getElementImage } from '@/utils/helpers/get-element-image'
import { getWeapon } from '@/utils/helpers/get-weapon'
import { Characters } from '@/types'
import { getRole } from '@/utils/helpers/get-role'
import CharacterMaterials from '@/render/components/panel/materials/character-materials'
import CharacterLoader from '@/render/components/UI/loaders/character-loader'
import AlertError from '@/render/components/UI/errors/alert-error'
import CharacterWeapons from '@/render/components/panel/weapons/character-weapons'
import CharacterArtifacts from '@/render/components/panel/artifacts/character-artifacts'
import CharacterBestStats from '@/render/components/panel/stats/character-best-stats'
import CharacterYoutube from '@/render/components/panel/yt/character-youtube'
import CharacterTeams from '@/render/components/panel/teams/character-teams'
import useSWR from 'swr'
import CharacterTalents from '@/render/components/panel/talents/character-talents'
import CharacterPassive from '@/render/components/panel/passive/character-passive'
import CharacterConstellations from '@/render/components/panel/constellations/character-constellations'

const CharacterSection = ({ characterId }: { characterId: string }) => {
  const {
    data: character,
    isLoading,
    error
  } = useSWR<Characters>(`/api/characters/character/${characterId}`, fetcher)

  if (error)
    return (
      <AlertError
        className='h-[calc(100vh_-_64px)]'
        message='Hubo un problema al cargar el personaje.'
      />
    )

  if (isLoading) return <CharacterLoader />

  return (
    <section>
      <Card className='dark:bg-color-dark/50 py-4 px-40'>
        <CardHeader className='flex justify-between items-center'>
          <div className='flex items-center space-x-10'>
            <Image
              isBlurred
              width={125}
              height={125}
              className='bg-color-darkest'
              src={character?.imageUrl!}
              alt={character?.name}
            />
            <div className='space-y-4'>
              <h1 className='text-3xl font-bold capitalize'>
                {character?.name}
              </h1>
              <div className='capitalize space-x-4'>
                <Chip
                  radius='sm'
                  className='bg-color-light text-color-darkest text-lg px-4'
                >
                  {getWeapon(character?.weapon!)!}
                </Chip>
                <Chip
                  radius='sm'
                  className='bg-color-light text-color-darkest text-lg px-4'
                >
                  {getRole(character?.role!)!}
                </Chip>
              </div>
            </div>
          </div>

          <Image
            isBlurred
            src={getElementImage(character?.element!)!}
            alt={`Element ${character?.element}`}
          />
        </CardHeader>
        <Divider />
        <CardBody className='grid grid-cols-4 gap-12'>
          <CharacterMaterials character={character} />
          <CharacterWeapons character={character} />
          <CharacterArtifacts character={character} />
          <CharacterBestStats character={character} />
          <CharacterYoutube character={character} />
          <CharacterTeams character={character} />
          <CharacterTalents character={character} />
          <CharacterPassive character={character} />
          <CharacterConstellations character={character} />
          <div>Ascencions Costs</div>
        </CardBody>
        <Divider />
        <CardFooter>Options</CardFooter>
      </Card>
    </section>
  )
}

export default CharacterSection
