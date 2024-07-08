'use client'

import { PanelErrorItem } from '@/render/components/UI/errors'
import { PanelSkeletonItem } from '@/render/components/UI/skeletons'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { IconGripVertical } from '@tabler/icons-react'
import Figure from '@/render/components/UI/misc/figure'

const CharacterItem = ({ character }: { character: any }) => {
  const characterId = character?.characterId

  const { data, isLoading, error } = useFetch(
    `/api/characters/character/${characterId}`
  )

  if (isLoading) return <PanelSkeletonItem />
  if (error) return <PanelErrorItem />

  return (
    <Card className='bg-color-darkest p-5'>
      <article className='flex items-center gap-4'>
        <IconGripVertical size={20} />
        <Figure padding='p-0'>
          <Image src={data.imageUrl!} alt={data.name} />
        </Figure>
        <h2 className='capitalize text-base md:text-lg font-medium'>
          {data.name}
        </h2>
      </article>
      <div>{/* TODO: Add delete button */}</div>
    </Card>
  )
}

export default CharacterItem
