import { CharacterType } from '@/render/src/types'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Search } from '@/render/src/shared/components/search'
import HomeFilters from '@/render/src/home/components/home-filters'
import CharacterList from '@/render/src/home/components/character-list'

interface HomeProps {
  characters: CharacterType[]
}

const CharacterContainer = ({ characters }: HomeProps) => {
  return (
    <Card className='bg-color-dark max-md:rounded-md'>
      <CardHeader className='max-md:p-1'>
        <div className='w-full space-y-5'>
          <div className='w-full flex flex-wrap gap-1 md:gap-4 justify-between items-center'>
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
      <CardBody className='max-md:p-1'>
        <CharacterList characters={characters} />
      </CardBody>
    </Card>
  )
}

export default CharacterContainer
