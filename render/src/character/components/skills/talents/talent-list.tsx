import { CharacterType } from '@/render/src/types'
import TalentItem from '@/render/src/character/components/skills/talents/talent-item'

interface TalentListProps {
  character: CharacterType
}

const TalentList = ({ character }: TalentListProps) => {
  const talents = character.talents ?? []

  return (
    <ol className='space-y-4'>
      {talents.map((talent) => (
        <li key={talent.id}>
          <TalentItem talent={talent} />
        </li>
      ))}
    </ol>
  )
}

export default TalentList
