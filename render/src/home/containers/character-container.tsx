import { CharacterType } from '@/render/src/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Search } from '@/render/src/panel/shared/components/ui/search'
import HomeFilters from '@/render/src/home/components/home-filters'
import CharacterList from '@/render/src/home/components/character-list'

interface HomeProps {
  characters: CharacterType[]
}

const CharacterContainer = ({ characters }: HomeProps) => {
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
              className='w-full md:max-w-[375px]'
              variant='underlined'
            />
          </div>

          <HomeFilters />
        </div>
      </CardHeader>
      <CardBody>
        <CharacterList characters={characters} />
      </CardBody>
    </Card>
  )
}

export default CharacterContainer
