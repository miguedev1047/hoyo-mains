import { CharacterType } from '@/render/src/types'
import MaterialItem from '@/render/src/character/components/materials/material-item'

interface MaterialListProps {
  character: CharacterType
}

const MaterialList = ({ character }: MaterialListProps) => {
  const materials = character?.materials ?? []

  return (
    <ol className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2 md:gap-4'>
      {materials.map((material) => (
        <MaterialItem key={material.item} material={material} />
      ))}
    </ol>
  )
}

export default MaterialList
