import { CharacterTypes } from '@/types'
import ListBuilds from '@/render/components/home/builds/list-builds'
import CharacterListWrapper from '@/render/components/UI/wrappers/character-list-wrapper'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const SectionBuild = ({ characters }: ListCharacterProps) => {
  return (
    <section className='rounded-xl'>
      <CharacterListWrapper title='Lista de builds' isFilter isSearchBar>
        <ListBuilds characters={characters} />
      </CharacterListWrapper>
    </section>
  )
}

export default SectionBuild
