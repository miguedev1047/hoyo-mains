import { CharacterTypes } from '@/types'
import ItemCharacterTalent from '@/render/components/panel/talents/item-character-talent'

const ListCharacterTalent = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const talents = character?.talents

  return ( 
    <ol className='space-y-4'>
      {talents?.map((talent) => (
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
