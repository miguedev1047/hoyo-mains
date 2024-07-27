import { Material } from '@prisma/client'
import { Search } from '@/render/src/shared/components/search'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import MaterialList from '@/render/src/database/materials/components/material-list'
import MaterialFilters from '@/render/src/database/materials/components/material-filters'

interface MaterialsProps {
  materials: Material[]
}

const Materials = ({ materials }: MaterialsProps) => {
  return (
    <Card className='bg-color-dark p-4'>
      <CardHeader>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
            <h2 className='text-base md:text-2xl font-bold'>
              Lista de Materiales
            </h2>

            <Search
              label='Buscar material'
              placeholder='Flor de seda...'
              searchQuery='name'
              className='w-full md:max-w-[375px]'
              variant='underlined'
            />
          </div>

          <MaterialFilters />
        </div>
      </CardHeader>
      <CardBody>
        <MaterialList materials={materials} />
      </CardBody>
    </Card>
  )
}

export default Materials
