import { CharacterTypes } from '@/types'
import ListCharacterPassive from '@/render/components/panel/passive/list-character-passive'
import PassiveModal from '@/render/components/UI/modal/passive-modal'

const CharacterPassive = ({
  character
}: {
  character: CharacterTypes | undefined
}) => { 
  return (
    <div className='col-span-4 space-y-4'>
      <ListCharacterPassive character={character} />
      <PassiveModal character={character} />
    </div>
  )
}

export default CharacterPassive
