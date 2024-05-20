import { Characters } from '@/types'
import SortableArtifactList from '@/render/components/panel/artifacts/sortable-artifact-list'
import ArtifactSelector from '@/render/components/panel/artifacts/artifact-selector'

const CharacterArtifacts = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-2'>
      <SortableArtifactList character={character} />
      <ArtifactSelector character={character} />
    </div>
  )
}

export default CharacterArtifacts
