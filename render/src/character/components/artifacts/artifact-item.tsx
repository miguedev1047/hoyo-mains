'use client'

import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Artifact, ArtifactByCharacter } from '@prisma/client'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import Tooltip from '@/render/src/shared/components/tooltip'

interface ArtifactItemProps {
  artifact: ArtifactByCharacter
  index: number
}

const ArtifactItem = ({ artifact, index }: ArtifactItemProps) => {
  const {
    data: fetchedArtifact,
    isLoading,
    error
  } = useFetch<Artifact>(`/api/artifacts/artifact/${artifact.item}`)

  if (error) return <SkeletonCard size='sm' />
  if (isLoading) return <SkeletonCard size='sm' />

  return (
    <>
      <Tooltip item={fetchedArtifact}>
        <Card className='p-5 bg-color-darkest'>
          <div className='flex gap-4 items-center select-none'>
            <div className='size-8 bg-color-dark grid place-items-center rounded-md'>
              <span>{index + 1}</span>
            </div>
            <Figure size='sm'>
              <Image
                className='w-full h-full object-cover'
                src={fetchedArtifact?.imageUrl!}
                alt={fetchedArtifact?.name!}
              />
            </Figure>
            <h3 className='text-xs md:text-base font-semibold line-clamp-1'>
              {fetchedArtifact?.name}
            </h3>
          </div>
        </Card>
      </Tooltip>
    </>
  )
}

export default ArtifactItem
