'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { ItemArtifactError } from '@/render/components/UI/errors/character-error'
import { Card, Image } from '@nextui-org/react'
import { Artifact, ArtifactByCharacter } from '@prisma/client'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

const CharacterArtifactItem = ({
  artifact,
  index
}: {
  artifact: ArtifactByCharacter
  index: number
}) => {
  const {
    data: dataArtifact,
    isLoading,
    error
  } = useSWR<Artifact>(`/api/artifacts/artifact/${artifact.item}`, fetcher)

  if (error) return <ItemArtifactError message='Ha ocurrido un error.' />
  if (isLoading) return <SkeletonMaterialItems />

  return (
    <>
      <TooltipItem item={dataArtifact}>
        <Card className='p-5 bg-color-darkest'>
          <div className='flex gap-4 items-center select-none'>
            <div className='bg-color-dark w-8 h-8 grid place-items-center rounded-md'>
              <span>{index + 1}</span>
            </div>
            <Figure width='w-10' height='h-10'>
              <Image
                radius='sm'
                className='w-full h-full object-cover'
                src={dataArtifact?.imageUrl!}
                alt={dataArtifact?.name!}
              />
            </Figure>
            <h3 className='text-xs md:text-lg font-semibold line-clamp-1'>
              {dataArtifact?.name}
            </h3>
          </div>
        </Card>
      </TooltipItem>
    </>
  )
}

export default CharacterArtifactItem
