import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { Search } from '@/render/src/shared/components/search'
import { BestTeamsType } from '@/render/src/types'
import ListTeams from '@/render/src/teams/components/team-list'

interface TeamsProps {
  teams: BestTeamsType[]
}
const TeamContainer = ({ teams }: TeamsProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardHeader>
        <BoxCardTitle>
          Mejores equipos
        </BoxCardTitle>

        <Search
          label='Buscar personaje'
          placeholder='Hu tao...'
          searchQuery='name'
          className='w-full md:max-w-[375px]'
          variant='underlined'
        />
      </BoxCardHeader>
      <BoxCardBody>
        <ListTeams teams={teams} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default TeamContainer
