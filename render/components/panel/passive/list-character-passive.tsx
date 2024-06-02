import { Characters } from '@/types'
import ItemCharacterPassive from '@/render/components/panel/passive/item-character-passive'

const ListCharacterPassive = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <ol className='space-y-4'>
      {character?.passives.map((passive) => (
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
