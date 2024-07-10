'use client'

import { elements, weapons } from '@/constants'
import { Divider } from '@nextui-org/react'
import { Search, SelectSearch } from '@/render/components/UI/search/search'

const CharacterNav = () => {
  return (
    <>
      <Divider />
      <nav className='w-full grid grid-cols-6 gap-2'>
        <Search
          label='Buscar personaje'
          className='col-span-6 md:col-span-4'
          searchQuery='name'
          placeholder='Escribe el nombre del personaje...'
        />
        <SelectSearch
          label='Filtrar por arma'
          className='col-span-6 md:col-span-1'
          placeholder='Selecciona un arma...'
          items={weapons}
          searchQuery='weapon'
        />
        <SelectSearch
          label='Filtrar por elemento'
          className='col-span-6 md:col-span-1'
          placeholder='Selecciona un elemento...'
          items={elements}
          searchQuery='element'
        />
      </nav>
      <Divider />
    </>
  )
}

export default CharacterNav
