import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { Artifact } from '@prisma/client'
import ArtifactItem from '@/render/src/panel/artifacts/components/artifact-item'

interface ArtifactListProps {
  artifacts: Artifact[]
}

const ArtifactList = ({ artifacts }: ArtifactListProps) => {
  if (!artifacts?.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron artefactos</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <ol className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
      {artifacts.map((artifact) => (
        <ArtifactItem key={artifact.id} artifact={artifact} />
      ))}
    </ol>
  )
}

export default ArtifactList
