import { CharacterTypes } from '@/types'
import CharacterMaterialItem from '@/render/components/home/characters/materials/character-material-item'

const CharacterMaterialList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const materials = character?.materials ?? []

  return (
    <ol className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {materials.map((material) => (
        <li key={material.id}>
          <CharacterMaterialItem material={material} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterMaterialList
