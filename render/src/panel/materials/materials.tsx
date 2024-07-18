import { Material } from '@prisma/client'
import MaterialList from '@/render/src/panel/materials/components/material-list'

interface MaterialsProps {
  materials: Material[]
}

const Materials = ({ materials }: MaterialsProps) => {
  return <MaterialList materials={materials} />
}

export default Materials
