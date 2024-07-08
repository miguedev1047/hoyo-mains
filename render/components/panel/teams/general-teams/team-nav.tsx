import { Search } from '@/render/components/UI/search/search'
import { Divider } from '@nextui-org/react'
import GeneralFormTeam from '@/render/components/panel/teams/general-teams/general-form-team'

const TeamNav = () => {
  return (
    <nav className='space-y-4'>
      <Divider />
      <Search
        label='Buscar personaje'
        placeholder='Buscar...'
        searchQuery='character'
        className={'w-full'}
      />
      <GeneralFormTeam />
      <Divider />
    </nav>
  )
}

export default TeamNav
