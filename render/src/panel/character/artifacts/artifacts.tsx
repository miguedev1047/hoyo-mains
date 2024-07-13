import { CharacterType } from '@/render/src/types'
import SortableArtifactList from '@/render/src/panel/character/artifacts/components/sortable-artifact-list'
import ArtifactSelector from '@/render/src/panel/character/artifacts/components/artifact-selector'

interface ArtifactsProps {
  character: CharacterType
}

const Artifacts = ({ character }: ArtifactsProps) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Artefactos
      </h3>

      <SortableArtifactList character={character} />
      <ArtifactSelector character={character} />
    </div>
  )
}

export default Artifacts
