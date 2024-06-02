import { Characters } from '@/types'
import MaterialSelector from '@/render/components/panel/materials/material-selector'
import SorteableMaterialList from '@/render/components/panel/materials/sortable-material-list'

const CharacterMaterials = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Materiales
      </h3>
      <SorteableMaterialList character={character} />
      <MaterialSelector character={character} />
    </div>
  )
}

export default CharacterMaterials
