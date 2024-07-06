import { CharacterTypes } from '@/types'
import CharacterPassiveItem from '@/render/components/home/characters/passives/charcter-passive-item'

const CharacterPassiveList = ({ character }: { character: CharacterTypes }) => {
  const { passives } = character

  return (
    <ol className='space-y-4'>
      {passives.map((passive) => (
        <li key={passive.id}>
          <CharacterPassiveItem passive={passive} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterPassiveList
