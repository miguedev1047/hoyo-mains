import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Search } from '@/render/src/shared/components/search'
import { WeaponType } from '@/render/src/types'
import WeaponFilters from '@/render/src/database/weapons/components/weapon-filters'
import WeaponTable from '@/render/src/database/weapons/components/weapon-table'

interface WeaponsProps {
  weapons: WeaponType[]
}

const Weapons = ({ weapons }: WeaponsProps) => {
  return (
    <Card className='bg-color-dark p-4'>
      <CardHeader>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
            <h2 className='text-base md:text-2xl font-bold'>Armas</h2>

            <Search
              label='Buscar arma'
              placeholder='Baculo de homa...'
              searchQuery='name'
              className='w-full md:max-w-[375px]'
              variant='underlined'
            />
          </div>

          <WeaponFilters />
        </div>
      </CardHeader>
      <CardBody>
        <WeaponTable weapons={weapons} />
      </CardBody>
    </Card>
  )
}

export default Weapons
