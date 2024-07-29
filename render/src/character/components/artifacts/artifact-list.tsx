import { CharacterType } from '@/render/src/types'
import ArtifactItem from '@/render/src/character/components/artifacts/artifact-item'

interface ArtifactListProps {
  character: CharacterType
}

const ArtifactList = ({ character }: ArtifactListProps) => {
  const artifacts = character?.artifacts ?? []

  return (
    <ol className='w-full space-y-1 sm:space-y-2 md:space-y-4'>
      {artifacts.map((artifact, index) => (
        <li key={artifact.id}>
          <ArtifactItem key={artifact.id} artifact={artifact} index={index} />
        </li>
      ))}
    </ol>
  )
}

export default ArtifactList
