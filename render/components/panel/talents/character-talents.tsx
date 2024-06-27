import { Characters } from '@/types'
import ListCharacterTalent from '@/render/components/panel/talents/list-character-talent'
import TalentModal from '@/render/components/UI/modal/talent-modal'

const CharacterTalents = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <ListCharacterTalent character={character} />
      <TalentModal character={character} />
    </div>
  )
}

export default CharacterTalents
