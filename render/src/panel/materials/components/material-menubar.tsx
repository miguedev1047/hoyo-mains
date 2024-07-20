import {
  Search,
  SearchSelect
} from '@/render/src/panel/shared/components/ui/search'
import { Divider } from '@nextui-org/react'
import { materialType, stars } from '@/render/src/shared/constants'

const MaterialMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-6 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Trozo de ágata agnidus...'
          searchQuery='name'
          className='col-span-6 lg:col-span-4'
        />
        <SearchSelect
          label='Filtrar por tipo'
          placeholder='Selecciona un tipo'
          items={materialType}
          searchQuery='type'
          className='col-span-6 lg:col-span-1'
        />
        <SearchSelect
          label='Filtrar por estrellas'
          placeholder='Selecciona un rango'
          items={stars}
          searchQuery='stars'
          className='col-span-6 lg:col-span-1'
        />
      </nav>
      <Divider />
    </>
  )
}

export default MaterialMenubar
