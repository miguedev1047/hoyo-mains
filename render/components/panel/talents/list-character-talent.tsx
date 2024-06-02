import { Characters } from '@/types'
import ItemCharacterTalent from '@/render/components/panel/talents/item-character-talent'

const ListCharacterTalent = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <ol className='space-y-4'>
      {character?.talents.map((talent) => (
        <ItemCharacterTalent
          key={talent.id}
          character={character}
          talent={talent}
        />
      ))}
    </ol>
  )
}

export default ListCharacterTalent
