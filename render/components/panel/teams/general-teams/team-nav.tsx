import { Search } from '@/render/components/UI/search/search'
import { Divider } from '@nextui-org/react'
import GeneralFormTeam from '@/render/components/panel/teams/general-teams/general-form-team'

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
        <GeneralFormTeam />
      </nav>
      <Divider />
    </>
  )
}

export default TeamNav
