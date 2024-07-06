import { CharacterTypes } from '@/types'
import CharacterTalentItem from '@/render/components/home/characters/talents/character-talent-item'

const CharacterTalentList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const { talents } = character ?? { talents: [] }

  return (
    <ol className='space-y-4'>
      {talents.map((talent) => (
        <li key={talent.id}>
          <CharacterTalentItem talent={talent} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterTalentList
