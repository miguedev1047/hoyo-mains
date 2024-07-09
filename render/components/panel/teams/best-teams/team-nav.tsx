import { Search } from '@/render/components/UI/search/search'
import { Divider } from '@nextui-org/react'
import BestTeamForm from '@/render/components/panel/teams/best-teams/best-team-form'

const TeamNav = () => {
  return (
    <>
      <Divider />
      <nav className='grid grid-cols-2 gap-4'>
        <Search
          label='Buscar personaje'
          placeholder='Buscar...'
          searchQuery='character'
          className={'w-full'}
        />
        <BestTeamForm />
      </nav>
      <Divider />
    </>
  )
}

export default TeamNav
