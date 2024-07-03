import { Card, CardBody, CardHeader } from '@nextui-org/card'
import CharacterFilter from '@/render/components/UI/filters/character-filter'
import ListBuilds from '@/render/components/home/builds/list-builds'
import SearchCharacter from '@/render/components/home/characters/search-character'

const SectionBuild = () => {
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
          <ListBuilds />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionBuild
