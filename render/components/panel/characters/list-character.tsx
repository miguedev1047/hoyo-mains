import { fetcher } from '@/utils/helpers/fetcher'
import { Character } from '@prisma/client'
import { filterCharacters } from '@/utils/helpers/filter-character'
import AlertError from '@/render/components/UI/errors/alert-error'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'
import ItemCharacter from '@/render/components/panel/characters/item-character'
import useSWR from 'swr'

interface Props {
  characterFilters: {
    searchValue: string
    element: string | undefined
  }
}

const ListCharacter = ({ characterFilters }: Props) => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters', fetcher)

  const filteredCharacter = filterCharacters(characterFilters, characters)

  if (error)
    return <AlertError message='Hubo un problema al cargar los personajes.' />

  if (isLoading) return <PanelLoader />

  if (!characters?.length)
    return <NoItems message='No hay personajes para mostrar.' />

  if (!filteredCharacter?.length)
    return <NoItems message='No se ha podido encontrar este personaje.' />

  return (
    <ol className='w-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4'>
      {filteredCharacter?.map((character) => (
        <ItemCharacter key={character.id} character={character} />
      ))}
    </ol>
  )
}

export default ListCharacter
