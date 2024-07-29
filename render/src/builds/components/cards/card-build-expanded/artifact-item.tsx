'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Artifact, ArtifactByCharacter } from '@prisma/client'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import Tooltip from '@/render/src/shared/components/tooltip'

interface ArtifactItemProps {
  artifact: ArtifactByCharacter
}

const ArtifactItem = ({ artifact }: ArtifactItemProps) => {
  const {
    data: fetchedArtifact,
    isLoading,
    error
  } = useFetch<Artifact>(`/api/artifacts/artifact/${artifact.item}`)

  if (error) return <SkeletonCard variant='dark' />
  if (isLoading) return <SkeletonCard variant='dark' />

  return (
    <Tooltip item={fetchedArtifact}>
      <Card className='bg-color-dark p-2 md:p-5 flex flex-row items-center gap-2 md:gap-4 max-md:rounded-md'>
        <Figure className='p-1'> 
          <Image src={fetchedArtifact?.imageUrl!} alt={fetchedArtifact?.name} />
        </Figure>
        <h2 className='text-sm md:text-base font-medium line-clamp-1'>
          {fetchedArtifact?.name}
        </h2>
      </Card>
    </Tooltip>
  )
}

export default ArtifactItem
