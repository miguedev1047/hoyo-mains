import { characterType } from '@/render/services/home/characters/data'
import CharacterMaterialList from '@/render/components/home/characters/materials/character-material-list'

const CharacterMaterials = ({
  character
}: {
  character: characterType | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Materiales
      </h3>

      <CharacterMaterialList character={character} />
    </div>
  )
}

export default CharacterMaterials
