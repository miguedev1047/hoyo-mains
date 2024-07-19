import { CharacterType } from '@/render/src/types'
import AscensionTable from '@/render/src/character/components/ascension/ascension-table'

interface AscensionProps {
  character: CharacterType
}

const Ascension = ({ character }: AscensionProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        <span className='capitalize'>{character?.name} </span>
        Mejoras de Ascensión
      </h3>

      <AscensionTable character={character} />
    </div>
  )
}

export default Ascension
