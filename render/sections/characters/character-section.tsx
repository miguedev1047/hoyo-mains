'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { getElementImage } from '@/utils/helpers/get-element-image'
import { getWeapon } from '@/utils/helpers/get-weapon'
import { Characters } from '@/types'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getRole } from '@/utils/helpers/get-role'
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
import clsx from 'clsx'

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
      <Card className='dark:bg-color-dark/50 py-4 px-40'>
        <CardHeader className='flex justify-between items-center'>
          <div className='flex items-center space-x-10'>
            <Image
              isBlurred
              width={125}
              height={125}
              className={clsx(
                'bg-color-dark border-2 p-0 aspect-square five-star',
                getStarBorderColor(character?.stars!)
              )}
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
        <CardFooter>Options</CardFooter>
      </Card>
    </section>
  )
}

export default CharacterSection
