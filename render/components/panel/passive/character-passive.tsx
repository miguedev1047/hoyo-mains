import { Characters } from '@/types'
import ItemCharacterPassive from '@/render/components/panel/passive/item-character-passive'
import FormCharacterPassive from '@/render/components/panel/passive/form-character-passive'

const CharacterPassive = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Pasivas
      </h3>

      <ItemCharacterPassive character={character} />
      <FormCharacterPassive character={character} />
    </div>
  )
}

export default CharacterPassive
