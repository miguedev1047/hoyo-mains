'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Character } from '@prisma/client'
import useSWR from 'swr'
import ItemCharacters from '@/render/components/panel/characters/item-characters'
import AlertError from '@/render/components/UI/errors/alert-error'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'

const CharactersSection = () => {
  const {
    data: characters,
    isLoading,
    error
  } = useSWR<Character[]>('/api/characters', fetcher)

  if (error)
    return <AlertError message='Hubo un problema al cargar los personajes.' />

  if (isLoading) return <PanelLoader />

  if (!characters?.length)
    return <NoItems message='No hay personajes para mostrar' />

  return (
    <section className='space-y-4'>
      <ol className='w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-4'>
        {characters?.map((character) => (
          <ItemCharacters key={character.id} character={character} />
        ))}
      </ol>
    </section>
  )
}

export default CharactersSection
