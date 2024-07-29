import {
  BoxCard,
  BoxCardBody,
  BoxCardHeader,
  BoxCardTitle
} from '@//render/src/shared/components/box'
import { Search } from '@/render/src/shared/components/search'
import { CharacterType } from '@/render/src/types'
import BuildFilters from '@/render/src/builds/components/build-filters'
import BuildList from '@/render/src/builds/components/build-list'

interface BuildsProps {
  builds: CharacterType[]
}

const BuildContainer = ({ builds }: BuildsProps) => {
  return (
    <BoxCard className='bg-color-dark'>
      <BoxCardHeader>
        <BoxCardTitle>Lista de builds</BoxCardTitle>

        <Search
          label='Buscar personaje'
          placeholder='Hu tao...'
          searchQuery='name'
          className='max-w-[375px]'
          variant='underlined'
        />
        <BuildFilters />
      </BoxCardHeader>
      <BoxCardBody>
        <BuildList builds={builds} />
      </BoxCardBody>
    </BoxCard>
  )
}

export default BuildContainer
