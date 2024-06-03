import { Characters } from '@/types'
import ListCharacterTalent from '@/render/components/panel/talents/list-character-talent'
import ModalTalent from '@/render/components/UI/modal/modal-talent'

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

      <ListCharacterTalent character={character} />
      <ModalTalent character={character} />
    </div>
  )
}

export default CharacterTalents
