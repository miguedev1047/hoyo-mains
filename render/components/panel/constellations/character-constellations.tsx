import { Characters } from '@/types'
import ListCharacterConstellation from '@/render/components/panel/constellations/list-character-constellation'
import ModalConstellation from '@/render/components/UI/modal/modal-constellation'

const CharacterConstellations = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Constelaciones
      </h3>

      <ListCharacterConstellation character={character} />
      <ModalConstellation character={character} />
    </div>
  )
}

export default CharacterConstellations
