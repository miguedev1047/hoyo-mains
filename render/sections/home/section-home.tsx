import { CharacterTypes } from '@/types'
import { ListCharacter } from '@/render/components/home/characters/list-character'
import CharacterListWrapper from '@/render/components/UI/wrappers/character-list-wrapper'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const SectionHome = ({ characters }: ListCharacterProps) => {
  return (
    <section className='rounded-xl'>
      <CharacterListWrapper title='Lista de personajes' isFilter isSearchBar>
        <ListCharacter characters={characters} />
      </CharacterListWrapper>
    </section>
  )
}

export default SectionHome
