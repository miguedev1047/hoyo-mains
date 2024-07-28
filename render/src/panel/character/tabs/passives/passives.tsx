import { CharacterType } from '@/render/src/types'
import PassiveList from '@/render/src/panel/character/tabs/passives/components/passive-list'
import PassiveSheet from '@/render/src/panel/character/tabs/passives/components/passive-sheet'

interface PassivesProps {
  character: CharacterType
}

const Passives = ({ character }: PassivesProps) => {
  return (
    <div className='space-y-4'>
      <PassiveList character={character} />
      <PassiveSheet character={character} />
    </div>
  )
}

export default Passives
