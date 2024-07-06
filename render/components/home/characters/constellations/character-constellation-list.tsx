import { CharacterTypes } from '@/types'
import CharacterConstellationItem from '@/render/components/home/characters/constellations/character-constellation-item'

const CharacterConstellationList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const { constellations } = character ?? { constellations: [] }
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
