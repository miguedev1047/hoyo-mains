import { CharacterType } from '@/render/src/types'
import ArtifactItem from '../items/artifact-item'

interface ArtifactListProps {
  build: CharacterType
}

const ArtifactList = ({ build }: ArtifactListProps) => {
  const artifacts = build.artifacts

  return (
    <ol className='space-y-2'>
      {artifacts.map((artifact) => (
        <ArtifactItem key={artifact.id} artifact={artifact} />
      ))}
    </ol>
  )
}

export default ArtifactList
