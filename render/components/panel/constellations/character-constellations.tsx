import { CharacterTypes } from '@/types'
import ListCharacterConstellation from '@/render/components/panel/constellations/list-character-constellation'
import ConstellationModal from '@/render/components/UI/modal/constellation-modal'

const CharacterConstellations = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <ListCharacterConstellation character={character} />
      <ConstellationModal character={character} />
    </div>
  )
}

export default CharacterConstellations
