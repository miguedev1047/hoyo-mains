import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Search } from '../panel/shared/components/ui/search'
import { CharacterType } from '../types'
import BuildFilters from './components/build-filters'
import BuildList from './components/build-list'

interface BuildsProps {
  builds: CharacterType[]
}

const Builds = ({ builds }: BuildsProps) => {
  return (
    <Card className='bg-color-dark p-4'>
      <CardHeader>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
            <h2 className='text-base md:text-2xl font-bold'>
              Lista de personajes
            </h2>

            <Search
              label='Buscar personaje'
              placeholder='Hu tao...'
              searchQuery='name'
              className='max-w-[375px]'
              variant='underlined'
            />
          </div>

          <BuildFilters />
        </div>
      </CardHeader>
      <CardBody>
        <BuildList builds={builds} />
      </CardBody>
    </Card>
  )
}

export default Builds
