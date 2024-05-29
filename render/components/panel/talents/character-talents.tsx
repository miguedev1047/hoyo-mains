import { Characters } from '@/types'
import FormCharacterTalent from './form-character-talent'
import ItemCharacterTalent from './item-character-talent'

const CharacterTalents = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Talentos
      </h3>

      <ItemCharacterTalent character={character} />
      <FormCharacterTalent character={character} />
    </div>
  )
}

export default CharacterTalents