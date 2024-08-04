import { Search } from '@/render/src/shared/components/search'
import { Divider } from '@nextui-org/react'
import React from 'react'

const TierlistMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-6 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Buscar...'
          searchQuery='name'
          className='col-span-6'
        />
      </nav>
      <Divider />
    </>
  )
}

export default TierlistMenubar
