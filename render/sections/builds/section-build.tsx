import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { CharacterTypes } from '@/types/characters-types'
import CharacterFilter from '@/render/components/UI/filters/character-filter'
import SearchCharacter from '@/render/components/home/characters/search-character'
import ListBuilds from '@/render/components/home/builds/list-builds'

const SectionBuild = ({ characters }: { characters: CharacterTypes[] }) => {
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
          <ListBuilds characters={characters} />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionBuild
