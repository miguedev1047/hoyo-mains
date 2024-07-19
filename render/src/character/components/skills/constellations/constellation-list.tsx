import { CharacterType } from '@/render/src/types'
import ConstellationItem from '@/render/src/character/components/skills/constellations/constellation-item'

interface ConstellationListProps {
  character: CharacterType
}

const ConstellationList = ({ character }: ConstellationListProps) => {
  const constellations = character.constellations ?? []

  return (
    <ol className='space-y-4'>
      {constellations.map((constellation) => (
        <li key={constellation.id}>
          <ConstellationItem constellation={constellation} />
        </li>
      ))}
    </ol>
  )
}

export default ConstellationList
