import { CharacterTypes } from '@/types'
import ItemCharacterPassive from '@/render/components/panel/passive/item-character-passive'

const ListCharacterPassive = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const passive = character?.passives

  return (
    <ol className='space-y-4'>
      {passive?.map((passive) => (
        <ItemCharacterPassive
          key={passive.id}
          character={character}
          passive={passive}
        />
      ))}
    </ol>
  )
}

export default ListCharacterPassive
