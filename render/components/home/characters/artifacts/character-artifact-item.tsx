'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { ItemArtifactError } from '@/render/components/UI/errors/character-error'
import { Card, Image } from '@nextui-org/react'
import { Artifact, ArtifactByCharacter } from '@prisma/client'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'

const CharacterArtifactItem = ({
  artifact
}: {
  artifact: ArtifactByCharacter
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
              <span>{artifact.order++}</span>
            </div>
            <figure className='flex-none relative w-10 h-10 p-1 bg-primary-color rounded-md overflow-hidden'>
              <Image
                radius='sm'
                className='w-full h-full rounded-md object-cover'
                src={dataArtifact?.imageUrl!}
                alt={dataArtifact?.name!}
              />
            </figure>
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
