import { Divider } from '@nextui-org/react'
import { Search } from '@/render/src/panel/shared/components/ui/search'
import TeamForm from '@/render/src/panel/teams/components/team-form'

const TeamMenubar = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        <Search
          label='Buscar personaje'
          placeholder='Buscar...'
          searchQuery='character'
          className='w-full'
        />
        <TeamForm />
      </nav>
      <Divider />
    </>
  )
}

export default TeamMenubar
