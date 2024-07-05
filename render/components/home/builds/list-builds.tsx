import { ItemCardComponent } from '@/render/components/home/builds/card/item-card-build'
import { CharacterTypes } from '@/types/characters-types'

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

const ListBuilds = ({ characters }: { characters: CharacterTypes[] }) => {
  const minCharacters = 0
  const isCharactersEmpty = characters?.length === minCharacters

  if (!characters) return <NoAvailableCharacters />
  if (isCharactersEmpty) return <CharacterNotFound />

  return (
    <ul className='relative grid grid-cols-1 gap-4 overflow-hidden select-none'>
      {characters?.map((build) => (
        <li key={build?.id}>
          <ItemCardComponent character={build} />
        </li>
      ))}
    </ul>
  )
}

export default ListBuilds
