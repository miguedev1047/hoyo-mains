import { Artifact } from '@prisma/client'
import ArtifactItem from '@/render/src/panel/artifacts/components/artifact-item'

interface ArtifactListProps {
  artifacts: Artifact[]
}

const ArtifactList = ({ artifacts }: ArtifactListProps) => {
  return (
    <ol className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {artifacts.map((artifact) => (
        <ArtifactItem key={artifact.id} artifact={artifact} />
      ))}
    </ol>
  )
}

export default ArtifactList
