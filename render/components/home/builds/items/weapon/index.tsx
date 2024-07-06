import { fetcher } from '@/utils/helpers/fetcher'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import { BuildSkeletonItem } from '@/render/components/UI/skeletons'
import { BuildErrorItem } from '@/render/components/UI/errors'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'

interface WeaponItemProps {
  item: string
  createdDate: Date
  updatedDate: Date
}

export const ItemBuildFirstWeapon = ({ weapon }: { weapon: WeaponItemProps }) => {
  const weaponId = weapon?.item

  const {
    data: weaponData,
    isLoading,
    error
  } = useSWR<Weapon | undefined>(`/api/weapons/weapon/${weaponId}`, fetcher)

  if (isLoading) return <BuildSkeletonItem />
  if (error || !weaponData || !weaponId) return <BuildErrorItem />

  return (
    <li>
      <TooltipItem item={weaponData}>
        <Card className='bg-color-dark p-2 rounded-md'>
          <div className='flex items-center gap-3'>
            <Figure>
              <Image
                src={weaponData?.imageUrl!}
                alt={`Arma: ${weaponData?.name}`}
              />
            </Figure>
            <h2 className='text-sm lg:text-base line-clamp-1'>
              {weaponData?.name}
            </h2>
          </div>
        </Card>
      </TooltipItem>
    </li>
  )
}

export const ItemBuildWeapon = ({ weapon }: { weapon: WeaponItemProps }) => {
  const weaponId = weapon.item

  const {
    data: weaponData,
    isLoading,
    error
  } = useSWR<Weapon | undefined>(`/api/weapons/weapon/${weaponId}`, fetcher)

  if (isLoading) return <BuildSkeletonItem />
  if (error) return <BuildErrorItem />

  return (
    <li>
      <TooltipItem item={weaponData}>
        <Card className='bg-color-dark p-2 rounded-md'>
          <div className='flex items-center gap-3'>
            <Figure>
              <Image
                src={weaponData?.imageUrl!}
                alt={`Arma: ${weaponData?.name}`}
              />
            </Figure>
            <h2 className='text-sm lg:text-base line-clamp-1'>
              {weaponData?.name}
            </h2>
          </div>
        </Card>
      </TooltipItem>
    </li>
  )
}
