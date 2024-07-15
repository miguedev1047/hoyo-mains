import { CharacterType } from '@/render/src/types'
import ConstellationList from '@/render/src/panel/character/tabs/constellations/components/constellation-list'
import ConstellationModal from '@/render/src/panel/character/tabs/constellations/components/constellation-modal'

interface ConstellationsProps {
  character: CharacterType
}

const Constellations = ({ character }: ConstellationsProps) => {
  return (
    <div className='space-y-4'>
      <ConstellationList character={character} />
      <ConstellationModal character={character} />
    </div>
  )
}

export default Constellations
