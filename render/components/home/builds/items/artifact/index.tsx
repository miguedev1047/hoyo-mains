import { fetcher } from '@/utils/helpers/fetcher'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import { BuildSkeletonItem } from '@/render/components/UI/skeletons'
import { BuildErrorItem } from '@/render/components/UI/errors'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'
import TooltipItem from '@/render/components/UI/tooltip/tooltip-item'

interface ArtifactItemProps {
  item: string
  createdDate: Date
  updatedDate: Date
}

export const ItemBuildFirstArtifact = ({ artifact }: { artifact: ArtifactItemProps }) => {
  const artifactId = artifact?.item

  const {
    data: artifactData,
    isLoading,
    error
  } = useSWR<Weapon | undefined>(
    `/api/artifacts/artifact/${artifactId}`,
    fetcher
  )

  if (isLoading) return <BuildSkeletonItem />
  if (error || !artifactData || !artifactId) return <BuildErrorItem />

  return (
    <TooltipItem item={artifactData}>
      <Card className='bg-color-dark p-2 rounded-md'>
        <div className='flex items-center gap-3'>
          <Figure>
            <Image
              src={artifactData?.imageUrl!}
              alt={`Artefacto: ${artifactData?.name}`}
            />
          </Figure>
          <h2 className='text-sm lg:text-base line-clamp-1'>
            {artifactData?.name}
          </h2>
        </div>
      </Card>
    </TooltipItem>
  )
}

export const ItemBuildArtifact = ({ artifact }: { artifact: ArtifactItemProps }) => {
  const artifactId = artifact.item

  const {
    data: artifactData,
    isLoading,
    error
  } = useSWR<Weapon | undefined>(
    `/api/artifacts/artifact/${artifactId}`,
    fetcher
  )

  if (isLoading) return <BuildSkeletonItem />
  if (error || !artifactData || !artifactId) return <BuildErrorItem />

  return (
    <TooltipItem item={artifactData}>
      <Card className='bg-color-dark p-2 rounded-md'>
        <div className='flex items-center gap-3'>
          <Figure>
            <Image
              src={artifactData?.imageUrl!}
              alt={`Artefacto: ${artifactData?.name}`}
            />
          </Figure>
          <h2 className='text-sm lg:text-base line-clamp-1'>
            {artifactData?.name}
          </h2>
        </div>
      </Card>
    </TooltipItem>
  )
}
