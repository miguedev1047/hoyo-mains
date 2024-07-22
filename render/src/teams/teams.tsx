import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Search } from '@/render/src/panel/shared/components/ui/search'
import { BestTeamsType } from '@/render/src/types'
import ListTeams from '@/render/src/teams/components/team-list'

interface TeamsProps {
  teams: BestTeamsType[]
}

const Teams = ({ teams }: TeamsProps) => {
  return (
    <Card className='bg-color-dark p-4'>
      <CardHeader>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
            <h2 className='text-base md:text-2xl font-bold'>Mejores equipos</h2>

            <Search
              label='Buscar personaje'
              placeholder='Hu tao...'
              searchQuery='name'
              className='w-full md:max-w-[375px]'
              variant='underlined'
            />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <ListTeams teams={teams} />
      </CardBody>
    </Card>
  )
}

export default Teams
