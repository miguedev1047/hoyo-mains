import { Card, CardBody, CardHeader } from '@nextui-org/card'
import CharacterItem from './character-item'
import CharacterSelector from './character-selector'

const GeneralTeamItem = ({
  team,
  characters
}: {
  team: any
  characters: any
}) => {
  const teamMembers = team.characters

  return (
    <Card className='bg-color-dark p-3'>
      <CardHeader>
        <article>
          {/* TODO: Add delete button */}
          <h2 className='capitalize text-base md:text-lg font-medium'>
            {team.name}
          </h2>
        </article>
      </CardHeader>
      <CardBody className='space-y-4'>
        <ol className='grid grid-cols-4 gap-4'>
          {teamMembers.map((character: any) => (
            <CharacterItem key={character.id} character={character} />
          ))}
        </ol>
        <CharacterSelector team={team} characters={characters} />
      </CardBody>
    </Card>
  )
}

export default GeneralTeamItem
