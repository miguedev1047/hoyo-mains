import { Card } from '@nextui-org/card'
import { BestTeamsType } from '@/render/src/types'
import { CharacterByTeam } from '@prisma/client'
import CharacterList from '@/render/src/teams/components/character-list'

interface TeamItemProps {
  team: BestTeamsType
}

const TeamItem = ({ team }: TeamItemProps) => {
  const characters = team.characters as CharacterByTeam[]

  return (
    <li>
      <Card className='bg-color-darkest p-5 space-y-5'>
        <h2 className='text-sm md:text-xl font-semibold capitalize'>
          {team.name}
        </h2>
        <CharacterList characters={characters} />
      </Card>
    </li>
  )
}

export default TeamItem
