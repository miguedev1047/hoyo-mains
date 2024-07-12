import { CharacterType } from '@/render/src/types'
import AscensionTable from '@/render/src/panel/character/ascension/components/ascension-table'
import AscensionForm from '@/render/src/panel/character/ascension/components/forms/ascension-form'

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
      <AscensionForm character={character} />
    </div>
  )
}

export default Ascension
