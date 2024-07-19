import { CharacterType } from '@/render/src/types'
import ArtifactList from '@/render/src/character/components/artifacts/artifact-list'

interface ArtifactsProps {
  character: CharacterType
}

const Artifacts = ({ character }: ArtifactsProps) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores artefactos
      </h3>

      <ArtifactList character={character} />
    </div>
  )
}

export default Artifacts
