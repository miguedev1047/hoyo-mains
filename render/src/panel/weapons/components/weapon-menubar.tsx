import { Divider } from '@nextui-org/react'
import { Search, SearchSelect } from '../../shared/components/ui/search'
import { stars, weapons } from '@/render/src/shared/constants'

const WeaponMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-6 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Aquila favonia...'
          searchQuery='name'
          className='col-span-6 lg:col-span-2 xl:col-span-4'
        />
        <SearchSelect
          label='Filtrar por arma'
          placeholder='Selecciona un arma'
          items={weapons}
          searchQuery='type'
          className='col-span-6 lg:col-span-2 xl:col-span-1'
        />
        <SearchSelect
          label='Filtrar por estrellas'
          placeholder='Selecciona un rango'
          items={stars}
          searchQuery='stars'
          className='col-span-6 lg:col-span-2 xl:col-span-1'
        />
      </nav>
      <Divider />
    </>
  )
}

export default WeaponMenubar
