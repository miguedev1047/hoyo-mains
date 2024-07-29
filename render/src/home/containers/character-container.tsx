import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { CharacterType } from '@/render/src/types'
import { Search } from '@/render/src/shared/components/search'
import HomeFilters from '@/render/src/home/components/home-filters'
import CharacterList from '@/render/src/home/components/character-list'

interface HomeProps {
  characters: CharacterType[]
}

const CharacterContainer = ({ characters }: HomeProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardHeader>
        <BoxCardTitle>
          Lista de personajes
        </BoxCardTitle>

        <Search
          label='Buscar personaje'
          placeholder='Hu tao...'
          searchQuery='name'
          className='w-full md:max-w-[375px]'
          variant='underlined'
        />

        <HomeFilters />
      </BoxCardHeader>
      <BoxCardBody>
        <CharacterList characters={characters} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default CharacterContainer
