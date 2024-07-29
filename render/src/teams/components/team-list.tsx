import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { BestTeamsType } from '@/render/src/types'
import TeamItem from '@/render/src/teams/components/team-item'

interface ListTeamsProps {
  teams: BestTeamsType[]
}

const ListTeams = ({ teams }: ListTeamsProps) => {
  if (!teams?.length)
    return (
      <NotFound className='h-40'>
        <NotFoundTitle>No se encontraron equipos</NotFoundTitle>
      </NotFound>
    )

  return (
    <ol className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {teams.map((team) => (
        <TeamItem key={team.id} team={team} />
      ))}
    </ol>
  )
}

export default ListTeams
