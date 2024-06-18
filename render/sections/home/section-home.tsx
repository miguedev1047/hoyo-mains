import ListCharacter from '@/render/components/home/characters/list-character'
import CharacterFilter from '@/render/components/home/filters/character-filter'
import { InputWrapper } from '@/utils/classes'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Input } from '@nextui-org/input'
import { IconSearch } from '@tabler/icons-react'

const SectionHome = () => {
  return (
    <section className='rounded-xl'>
      <Card isBlurred className='bg-color-darkest p-4'>
        <CardHeader>
          <div className='w-full space-y-5'>
            <div className='w-full flex justify-between items-center'>
              <h2 className='text-base md:text-2xl font-bold'>
                Lista de personajes
              </h2>

              <Input
                classNames={InputWrapper}
                aria-label='Buscar'
                placeholder='Buscar...'
                className='max-w-[400px]'
                startContent={<IconSearch />}
                isClearable
                size='lg'
              />
            </div>
            <CharacterFilter />
          </div>
        </CardHeader>
        <CardBody>
          <ListCharacter />
        </CardBody>
      </Card>
    </section>
  )
}

export default SectionHome
