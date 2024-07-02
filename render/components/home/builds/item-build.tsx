import { Card } from '@nextui-org/card'
import { Chip, Image } from '@nextui-org/react'
import { getStarBorderColor } from '@/utils/helpers/get-color'
import { getRole } from '@/utils/helpers/get-role'
import { characterType } from '@/types'
import { ItemBuildFirstWeapon } from './items/weapon'
import { ItemBuildFirstArtifact } from './items/artifact'
import Figure from '@/render/components/UI/misc/figure'
import clsx from 'clsx'
import ItemCharacterStats from './items/stats/item-build-stats'

const ItemBuild = ({ character }: { character: characterType | undefined }) => {
  const starCharacter = getStarBorderColor(character?.stars || 0)

  const [firstWeapon] = character?.weapons ?? []
  const [firstArtifact] = character?.artifacts ?? []

  return (
    <Card className='bg-color-dark p-4'>
      <div className='flex justify-between items-center gap-5'>
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
            <h2 className='capitalize text-lg font-medium'>{character?.name}</h2>
            <Chip className='capitalize rounded-md'>
              {getRole(character?.role!)!}
            </Chip>
          </div>
        </div>

        <div className='w-full max-w-[860px] grid grid-cols-4 gap-2'>
          <div className='col-span-2 space-y-2'>
            <ItemBuildFirstWeapon weapon={firstWeapon} />
            <ItemBuildFirstArtifact artifact={firstArtifact} />
          </div>

          <ItemCharacterStats character={character} />
        </div>
      </div>
    </Card>
  )
}

export default ItemBuild
