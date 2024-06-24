import { characterType } from '@/render/services/home/characters/data'
import CharacterTalentItem from '@/render/components/home/characters/talents/character-talent-item'

const CharacterTalentList = ({ character }: { character: characterType }) => {
  const { talents } = character

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
