import { CharacterTypes } from '@/types'
import FormCharacterAscension from '@/render/components/panel/ascensions/form-character-ascension'
import TableCharacterAscension from '@/render/components/panel/ascensions/table/table-character-ascension'

const CharacterAscension = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        <span className='capitalize'>{character?.name} </span>
        Mejoras de Ascensión
      </h3>

      <TableCharacterAscension character={character} />
      <FormCharacterAscension character={character} />
    </div>
  )
}

export default CharacterAscension
