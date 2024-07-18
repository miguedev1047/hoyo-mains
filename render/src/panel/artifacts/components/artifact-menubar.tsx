import { Divider } from '@nextui-org/react'
import { Search } from '@/render/src/panel/shared/components/ui/search'

const ArtifactMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-6 gap-4'>
        <Search
          label='Buscar por nombre'
          placeholder='Bruja Carmesi...'
          searchQuery='name'
          className='col-span-6'
        />
      </nav>
      <Divider />
    </>
  )
}

export default ArtifactMenubar
