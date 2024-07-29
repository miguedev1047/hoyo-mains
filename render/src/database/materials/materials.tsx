import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { Material } from '@prisma/client'
import { Search } from '@/render/src/shared/components/search'
import MaterialList from '@/render/src/database/materials/components/material-list'
import MaterialFilters from '@/render/src/database/materials/components/material-filters'

interface MaterialsProps {
  materials: Material[]
}

const Materials = ({ materials }: MaterialsProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardHeader>
        <BoxCardTitle>Lista de Materiales</BoxCardTitle>

        <Search
          label='Buscar material'
          placeholder='Flor de seda...'
          searchQuery='name'
          className='w-full md:max-w-[375px]'
          variant='underlined'
        />
        <MaterialFilters />
      </BoxCardHeader>
      <BoxCardBody>
        <MaterialList materials={materials} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default Materials
