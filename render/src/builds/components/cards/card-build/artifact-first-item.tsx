'use client'

import { Figure } from '@/render/src/shared/components/figure'
import { SkeletonCard } from '@/render/src/shared/components/skeleton'
import { CharacterType } from '@/render/src/types'
import { useFetch } from '@/render/src/shared/utilities/hooks/use-fetch'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import Tooltip from '@/render/src/shared/components/tooltip'

interface ArtifactFirstItemProps {
  build: CharacterType
}

const ArtifactFirstItem = ({ build }: ArtifactFirstItemProps) => {
  const [firstArtifact] = build.artifacts

  const {
    data: artifact,
    isLoading,
    error
  } = useFetch<Weapon>(`/api/artifacts/artifact/${firstArtifact.item}`)

  if (isLoading) return <SkeletonCard variant='dark' className='p-4 h-20' />
  if (error) return <SkeletonCard variant='dark' className='p-4 h-20' />

  return (
    <Tooltip item={artifact}>
      <Card className='bg-color-dark p-4 flex flex-row items-center gap-4'>
        <Figure>
          <Image src={artifact?.imageUrl!} alt={artifact?.name} />
        </Figure>
        <h4 className='font-medium line-clamp-1'>{artifact?.name}</h4>
      </Card>
    </Tooltip>
  )
}

export default ArtifactFirstItem
