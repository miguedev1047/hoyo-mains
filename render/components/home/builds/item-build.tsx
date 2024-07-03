import { useState } from 'react'
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { Button, Chip, Image, Tooltip } from '@nextui-org/react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getRole } from '@/utils/helpers/get-role'
import { characterType } from '@/types'
import { ItemBuildFirstWeapon } from '@/render/components/home/builds/items/weapon'
import { ItemBuildFirstArtifact } from '@/render/components/home/builds/items/artifact'
import {
  ItemCharacterStats,
  ItemCharacterStatsFull
} from '@/render/components/home/builds/items/stats'
import { Card } from '@nextui-org/card'
import ListWeapons from '@/render/components/home/builds/items/weapon/list-weapons'
import ListArtifacts from '@/render/components/home/builds/items/artifact/list-artifacts'
import Figure from '@/render/components/UI/misc/figure'
import clsx from 'clsx'

const ItemBuild = ({ character }: { character: characterType | undefined }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const starCharacter = getStarBorderColor(character?.stars || 0)

  const [firstWeapon] = character?.weapons ?? []
  const [firstArtifact] = character?.artifacts ?? []

  const weapons = character?.weapons ?? []
  const artifacts = character?.artifacts ?? []

  return (
    <Card
      className={clsx(
        'bg-color-dark p-4',
        isOpen ? 'border-[1px] border-color-success' : ''
      )}
    >
      <div
        className={clsx(
          'flex justify-between gap-5',
          isOpen ? 'items-start' : 'items-center'
        )}
      >
        <div className='flex items-center gap-5'>
          <Figure
            padding='p-0'
            width='w-32'
            height='h-32'
            radius='rounded-lg'
            className={clsx(' border-[1px]', starCharacter)}
          >
            <Image
              src={character?.imageUrl!}
              alt={`Personaje: ${character?.name}`}
            />
          </Figure>
          <div className='space-y-2'>
            <h2 className='capitalize text-lg font-medium'>
              {character?.name}
            </h2>
            <Chip className='capitalize rounded-md'>
              {getRole(character?.role!)!}
            </Chip>
          </div>
        </div>

        <div className='flex gap-4 items-start'>
          <div className='w-[800px] grid grid-cols-4 gap-2'>
            {!isOpen && (
              <>
                <div className='col-span-2 space-y-2'>
                  <ItemBuildFirstWeapon weapon={firstWeapon} />
                  <ItemBuildFirstArtifact artifact={firstArtifact} />
                </div>

                <ItemCharacterStats character={character} />
              </>
            )}

            {isOpen && (
              <>
                <ListWeapons weapon={weapons} />
                <ListArtifacts artifact={artifacts} />
                <ItemCharacterStatsFull character={character} />
              </>
            )}
          </div>

          <Tooltip
            className='bg-color-light text-color-darkest'
            content={isOpen ? 'Cerrar' : 'Ver más'}
          >
            <Button onPress={handleOpen} isIconOnly className='bg-transparent'>
              {isOpen ? (
                <IconChevronUp size={24} />
              ) : (
                <IconChevronDown size={24} />
              )}
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  )
}

export default ItemBuild
