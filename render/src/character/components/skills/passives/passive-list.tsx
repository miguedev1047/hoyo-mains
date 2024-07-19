import { CharacterType } from '@/render/src/types'
import PassiveItem from '@/render/src/character/components/skills/passives/passive-item'

interface PassiveListProps {
  character: CharacterType
}

const PassiveList = ({ character }: PassiveListProps) => {
  const passives = character.passives ?? []

  return (
    <ol className='space-y-4'>
      {passives.map((passive) => (
        <li key={passive.id}>
          <PassiveItem passive={passive} />
        </li>
      ))}
    </ol>
  )
}

export default PassiveList
