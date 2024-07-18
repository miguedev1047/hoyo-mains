import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { Material } from '@prisma/client'
import MaterialItem from '@/render/src/panel/materials/components/material-item'

interface MaterialListProps {
  materials: Material[]
}

const MaterialList = ({ materials }: MaterialListProps) => {
  if (!materials.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron materiales</NotFoundTitle>
      </NotFound>
    )
  }

  return (
    <ol className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {materials.map((material) => (
        <MaterialItem key={material.id} material={material} />
      ))}
    </ol>
  )
}

export default MaterialList
