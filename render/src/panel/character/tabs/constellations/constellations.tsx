import { CharacterType } from '@/render/src/types'
import ConstellationList from '@/render/src/panel/character/tabs/constellations/components/constellation-list'
import ConstellationSheet from '@/render/src/panel/character/tabs/constellations/components/constellation-sheet'

interface ConstellationsProps {
  character: CharacterType
}

const Constellations = ({ character }: ConstellationsProps) => {
  return (
    <div className='space-y-4'>
      <ConstellationList character={character} />
      <ConstellationSheet character={character} />
    </div>
  )
}

export default Constellations
