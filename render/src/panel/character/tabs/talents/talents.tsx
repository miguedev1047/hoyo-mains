import { CharacterType } from '@/render/src/types'
import TalentList from '@/render/src/panel/character/tabs/talents/components/talent-list'
import TalentSheet from '@/render/src/panel/character/tabs/talents/components/talent-sheet'

interface TalentsProps {
  character: CharacterType
}

const Talents = ({ character }: TalentsProps) => {
  return (
    <div className='space-y-4'>
      <TalentList character={character} />
      <TalentSheet character={character} />
    </div>
  )
}

export default Talents
