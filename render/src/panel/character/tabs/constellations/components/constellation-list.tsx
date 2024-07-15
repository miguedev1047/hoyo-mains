import { CharacterType, ConstellationsType } from '@/render/src/types'
import ConstellationItem from './constellation-item'

interface ConstellationListProps {
  character: CharacterType
}

const ConstellationList = ({ character }: ConstellationListProps) => {
  const constellations = character.constellations as ConstellationsType[]

  return (
    <ol className='w-full grid grid-cols-1 gap-4'>
      {constellations.map((constellation) => (
        <ConstellationItem
          key={constellation.id}
          constellation={constellation}
        />
      ))}
    </ol>
  )
}

export default ConstellationList
