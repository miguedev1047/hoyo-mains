import { Search, SearchSelect } from '@/render/src/shared/components/search'
import { Divider } from '@nextui-org/react'
import { elements, weapons } from '@/render/src/shared/constants'

const CharacterMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-6 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Hu tao...'
          searchQuery='name'
          className='col-span-6 lg:col-span-2 xl:col-span-4'
        />
        <SearchSelect
          label='Filtrar por arma'
          placeholder='Selecciona un arma'
          className='col-span-6 lg:col-span-2 xl:col-span-1'
          items={weapons}
          searchQuery='weapon'
        />
        <SearchSelect
          label='Filtrar por arma'
          placeholder='Selecciona un arma'
          className='col-span-6 lg:col-span-2 xl:col-span-1'
          items={elements}
          searchQuery='element'
        />
      </nav>
      <Divider />
    </>
  )
}

export default CharacterMenubar
