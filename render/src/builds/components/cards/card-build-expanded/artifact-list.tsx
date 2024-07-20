import { CharacterType } from '@/render/src/types'
import ArtifactItem from '@/render/src/builds/components/cards/card-build-expanded/artifact-item'

interface ArtifactListProps {
  build: CharacterType
}

const ArtifactList = ({ build }: ArtifactListProps) => {
  const artifacts = build.artifacts

  return (
    <div className='space-y-4'>
      <h2 className='text-lg capitalize font-bold text-secondary-color'>
        Mejores artefactos
      </h2>
      <ol className='space-y-2'>
        {artifacts.map((artifact) => (
          <ArtifactItem key={artifact.id} artifact={artifact} />
        ))}
      </ol>
    </div>
  )
}

export default ArtifactList
