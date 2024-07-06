import { CharacterTypes } from '@/types'
import CharacterConstellationItem from '@/render/components/home/characters/constellations/character-constellation-item'

const CharacterConstellationList = ({
  character
}: {
  character: CharacterTypes
}) => {
  const { constellations } = character
  return (
    <ol className='space-y-4'>
      {constellations.map((constellation) => (
        <li key={constellation.id}>
          <CharacterConstellationItem constellation={constellation} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterConstellationList
