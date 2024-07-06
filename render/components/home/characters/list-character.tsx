import { CharacterTypes } from '@/types'
import ItemCharacter from '@/render/components/home/characters/item-character'

interface ListCharacterProps {
  characters: CharacterTypes[]
}

const NoAvailableCharacters = () => (
  <div className='text-color-light/50 text-lg md:text-2xl text-center font-bold'>
    <p>No hay personajes disponibles</p>
  </div>
)

const CharacterNotFound = () => (
  <div className='text-color-light/50 text-lg md:text-2xl text-center font-bold'>
    <p>Personaje no encontrado</p>
  </div>
)

export const ListCharacter = ({ characters }: ListCharacterProps) => {
  const minCharacters = 0
  const isCharactersEmpty = characters?.length === minCharacters

  if (!characters) return <NoAvailableCharacters />
  if (isCharactersEmpty) return <CharacterNotFound />

  return (
    <ul className='relative grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 overflow-hidden gap-4 select-none'>
      {characters?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ul>
  )
}
