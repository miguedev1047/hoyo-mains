import { CharacterTypes } from '@/types'
import SortableArtifactList from '@/render/components/panel/artifacts/sortable-artifact-list'
import ArtifactSelector from '@/render/components/panel/artifacts/artifact-selector'

const CharacterArtifacts = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
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

export default CharacterArtifacts
