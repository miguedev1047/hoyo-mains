import { TeamProps } from '@/types'
import GeneralTeamItem from '@/render/components/panel/teams/general-teams/general-team-item'

const CharacterGeneralTeamList = ({
  teams,
  characters
}: {
  teams: TeamProps[]
  characters: any
}) => {
  return (
    <ol className='space-y-4'>
      {teams?.map((team) => (
        <GeneralTeamItem key={team.id} characters={characters} team={team} />
      ))}
    </ol>
  )
}

export default CharacterGeneralTeamList
