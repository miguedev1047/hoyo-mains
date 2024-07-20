'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { useFetch } from '@/utils/hooks/general/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Artifact, ArtifactByCharacter } from '@prisma/client'
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

  if (error) return <SkeletonCard variant='dark' className='p-4 h-20' />
  if (isLoading) return <SkeletonCard variant='dark' className='p-4 h-20' />

  return (
    <Tooltip item={fetchedArtifact}>
      <Card className='bg-color-dark p-4 flex flex-row items-center gap-4'>
        <Figure>
          <Image src={fetchedArtifact?.imageUrl!} alt={fetchedArtifact?.name} />
        </Figure>

        <h2 className='font-medium line-clamp-1'>{fetchedArtifact?.name}</h2>
      </Card>
    </Tooltip>
  )
}

export default ArtifactItem
