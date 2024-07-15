import { CharacterType, TalentsType } from '@/render/src/types'
import TalentItem from '@/render/src/panel/character/tabs/talents/components/talent-item'

interface TalentListProps {
  character: CharacterType
}

const TalentList = ({ character }: TalentListProps) => {
  const talents = character.talents as TalentsType[]

  return (
    <ol className='w-full grid grid-cols-1 gap-4'>
      {talents.map((talent) => (
        <TalentItem key={talent.id} talent={talent} />
      ))}
    </ol>
  )
}

export default TalentList
