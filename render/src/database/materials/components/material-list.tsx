import { Material } from '@prisma/client'
import MaterialItem from '@/render/src/database/materials/components/material-item'

interface WeaponTableProps {
  materials: Material[]
}

const MaterialList = ({ materials }: WeaponTableProps) => {
  
  return (
    <ol className='w-full grid grid-cols-1 gap-4 bg-color-darkest p-4 rounded-xl'>
    {materials.map((material) => (
      <MaterialItem key={material.id} material={material} />
    ))}
  </ol>
  )
}

export default MaterialList
