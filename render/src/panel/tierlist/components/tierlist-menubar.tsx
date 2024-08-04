import { Search } from '@/render/src/shared/components/search'
import { Divider } from '@nextui-org/react'
import TierlistForm from '@/render/src/panel/tierlist/components/tierlist-form'

const TierlistMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Buscar...'
          searchQuery='name'
          className='w-full'
        />
        <TierlistForm />
      </nav>
      <Divider />
    </>
  )
}

export default TierlistMenubar
