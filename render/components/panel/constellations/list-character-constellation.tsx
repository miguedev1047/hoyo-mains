import { Characters } from '@/types'
import ItemCharacterConstellation from '@/render/components/panel/constellations/item-character-constellation'

const ListCharacterConstellation = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <ol className='space-y-4'>
      {character?.constellations.map((constellation) => (
        <ItemCharacterConstellation
          key={constellation.id}
          character={character}
          constellation={constellation}
        />
      ))}
    </ol>
  )
}

export default ListCharacterConstellation
