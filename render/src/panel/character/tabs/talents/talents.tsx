import { CharacterType } from '@/render/src/types'
import TalentList from './components/talent-list'
import TalentModal from './components/talent-modal'

interface TalentsProps {
  character: CharacterType
}

const Talents = ({ character }: TalentsProps) => {
  return (
    <div className='space-y-4'>
      <TalentList character={character} />
      <TalentModal character={character} />
    </div>
  )
}

export default Talents
