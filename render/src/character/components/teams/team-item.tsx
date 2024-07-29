import { TeamByCharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'
import CharacterList from '@/render/src/character/components/teams/character-list'

interface TeamItemProps {
  team: TeamByCharacterType
}

const TeamItem = ({ team }: TeamItemProps) => {
  return (
    <Card className='p-2 md:p-4 max-md:rounded-md bg-color-darkest space-y-4'>
      <article>
        <h3 className='text-lg font-semibold capitalize'>{team?.name}</h3>
      </article>

      <CharacterList team={team} />
    </Card>
  )
}

export default TeamItem
