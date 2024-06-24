import { Team } from '@/types'
import { Card } from '@nextui-org/card'
import CharacterList from '@/render/components/home/characters/teams/character-list'

const CharacterTeamItem = ({ team }: { team: Team }) => {
  return (
    <Card className='p-5 bg-color-darkest space-y-4'>
      <article>
        <h3 className='text-lg font-semibold capitalize'>{team?.name}</h3>
      </article>

      <CharacterList team={team} />
    </Card>
  )
}

export default CharacterTeamItem
