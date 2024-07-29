import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { Search } from '@/render/src/shared/components/search'
import { WeaponType } from '@/render/src/types'
import WeaponFilters from '@/render/src/database/weapons/components/weapon-filters'
import WeaponTable from '@/render/src/database/weapons/components/weapon-table'

interface WeaponsProps {
  weapons: WeaponType[]
}

const Weapons = ({ weapons }: WeaponsProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardHeader>
        <BoxCardTitle>Lista de Armas</BoxCardTitle>

        <Search
          label='Buscar arma'
          placeholder='Baculo de homa...'
          searchQuery='name'
          className='w-full md:max-w-[375px]'
          variant='underlined'
        />
        
        <WeaponFilters />
      </BoxCardHeader>
      <BoxCardBody>
        <WeaponTable weapons={weapons} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default Weapons
