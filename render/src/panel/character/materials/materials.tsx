import { CharacterType } from '@/render/src/types'
import SortableMaterialList from '@/render/src/panel/character/materials/components/sortable-material-list'
import MaterialSelector from '@/render/src/panel/character/materials/components/material-selector'

interface CharacterProps {
  character: CharacterType
}

const Materials = ({ character }: CharacterProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Materiales
      </h3>
      <SortableMaterialList character={character} />
      <MaterialSelector character={character} />
    </div>
  )
}

export default Materials
