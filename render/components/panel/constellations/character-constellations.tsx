import { Characters } from '@/types'
import ItemCharacterConstellation from '@/render/components/panel/constellations/item-character-constellation'
import FormCharacterConstellation from '@/render/components/panel/constellations/form-character-constellation'

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

      <ItemCharacterConstellation character={character} />
      <FormCharacterConstellation character={character} />
    </div>
  )
}

export default CharacterConstellations
