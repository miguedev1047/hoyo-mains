import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { characterType } from '@/types'
import { ListCharacter } from '@/render/components/home/characters/list-character'
import CharacterFilter from '@/render/components/UI/filters/character-filter'
import SearchCharacter from '@/render/components/home/characters/search-character'

interface ListCharacterProps {
  characters: characterType[]
}

const SectionHome = ({ characters }: ListCharacterProps) => {
  return (
    <section className='rounded-xl'>
      <Card className='bg-color-dark p-4'>
        <CardHeader>
          <div className='w-full space-y-5'>
            <div className='w-full flex flex-wrap gap-4 justify-between items-center'>
              <h2 className='text-base md:text-2xl font-bold'>
                Lista de personajes
              </h2>

              <SearchCharacter />
            </div>
            <CharacterFilter />
          </div>
        </CardHeader>
        <CardBody>
          <ListCharacter characters={characters} />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionHome
