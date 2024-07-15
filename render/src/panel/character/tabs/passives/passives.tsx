import { CharacterType } from '@/render/src/types'
import PassiveList from '@/render/src/panel/character/tabs/passives/components/passive-list'
import PassiveModal from '@/render/src/panel/character/tabs/passives/components/passive-modal'

interface PassivesProps {
  character: CharacterType
}

const Passives = ({ character }: PassivesProps) => {
  return (
    <div className='space-y-4'>
      <PassiveList character={character} />
      <PassiveModal character={character} />
    </div>
  )
}

export default Passives
