'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { Divider } from '@nextui-org/divider'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Character } from '@prisma/client'
import { getElementImage } from '@/utils/helpers/get-element-image'
import { getRarityColor } from '@/utils/helpers/get-rarity-color'
import { getWeapon } from '@/utils/helpers/get-weapon'
import { getRole } from '@/utils/helpers/get-role'
import useSWR from 'swr'

const CharacterSection = ({ characterId }: { characterId: string }) => {
  const {
    data: character,
    isLoading,
    error
  } = useSWR<Character>(`/api/characters/character/${characterId}`, fetcher)

  if (error) return <div>Error loading characters</div>
  if (isLoading) return <div>Loading...</div>

  const color = getRarityColor({ type: 'gradient', item: character! })

  return (
    <section className='space-y-4'>
      <Card className='bg-color-dark p-4'>
        <CardHeader className='flex justify-between items-center'>
          <div className='flex items-center space-x-8'>
            <Image
              isBlurred
              width={125}
              height={125}
              className={color}
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
        <CardBody>
          <div>Upgrade materials</div>
          <div>Best weapons</div>
          <div>Best artifacts</div>
          <div>Best stats</div>
          <div>Best YT guide</div>
          <div>Best teams</div>
          <div> Talents Passives</div>
          <div>Constellations</div>
          <div>Ascencions Costs</div>
        </CardBody>
        <Divider />
        <CardFooter>Options</CardFooter>
      </Card>
    </section>
  )
}

export default CharacterSection
