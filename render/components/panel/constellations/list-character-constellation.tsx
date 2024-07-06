import { CharacterTypes } from '@/types'
import ItemCharacterConstellation from '@/render/components/panel/constellations/item-character-constellation'

const ListCharacterConstellation = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const constellations = character?.constellations

  return (
    <ol className='space-y-4'>
      {constellations?.map((constellation) => (
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
