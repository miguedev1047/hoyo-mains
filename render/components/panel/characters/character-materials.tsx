import { Characters } from '@/types'
import MaterialSelector from '@/render/components/panel/characters/material-selector'
import SorteableMaterialList from '@/render/components/panel/characters/sortable-material-list'

const CharacterMaterials = ({ character }: { character: Characters }) => {
  const allMaterials = character.materials

  return (
    <div className='col-span-2'>
      <SorteableMaterialList character={character} />

      {allMaterials.length === 6 && <MaterialSelector character={character} />}
    </div>
  )
}

export default CharacterMaterials
