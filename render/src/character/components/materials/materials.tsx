import { CharacterType } from '@/render/src/types'
import MaterialList from '@/render/src/character/components/materials/material-list'

interface CharacterProps {
  character: CharacterType
}

const Materials = ({ character }: CharacterProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Materiales
      </h3>

      <MaterialList character={character} />
    </div>
  )
}

export default Materials
