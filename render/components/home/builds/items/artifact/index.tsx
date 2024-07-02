import { fetcher } from '@/utils/helpers/fetcher'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import { Weapon } from '@prisma/client'
import Figure from '@/render/components/UI/misc/figure'
import useSWR from 'swr'

interface Props {
  item: string
  createdDate: Date
  updatedDate: Date
}

export const ItemBuildFirstArtifact = ({ artifact }: { artifact: Props }) => {
  const artifactId = artifact.item

  const {
    data: artifactData,
    isLoading,
    error
  } = useSWR<Weapon | undefined>(`/api/artifacts/artifact/${artifactId}`, fetcher)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error...</div>

  return (
    <Card className='bg-color-darkest p-2 rounded-md'>
      <div className='flex items-center gap-3'>
        <Figure>
          <Image
            src={artifactData?.imageUrl!}
            alt={`Artefacto: ${artifactData?.name}`}
          />
        </Figure>
        <h2>
          {artifactData?.name}
        </h2>
      </div>
    </Card>
  )
}
