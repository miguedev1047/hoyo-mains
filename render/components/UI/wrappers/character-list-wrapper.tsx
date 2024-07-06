import { Card, CardBody, CardHeader } from '@nextui-org/card'
import SearchCharacter from '../../home/characters/search-character'
import CharacterFilter from '../filters/character-filter'

interface CharacterListWrapperProps {
  title?: string
  isFilter?: boolean
  isSearchBar?: boolean
  children: React.ReactNode
}

const CharacterListWrapper = ({
  title = 'Lista',
  isFilter = false,
  isSearchBar = false,
  children
}: CharacterListWrapperProps) => {
  return (
    <div>
      <Card className='bg-color-dark p-4'>
        <CardHeader>
          <div className='w-full space-y-5'>
            <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
              <h2 className='text-base md:text-2xl font-bold'>{title}</h2>

              {isSearchBar && <SearchCharacter />}
            </div>

            {isFilter && <CharacterFilter />}
          </div>
        </CardHeader>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  )
}

export default CharacterListWrapper
