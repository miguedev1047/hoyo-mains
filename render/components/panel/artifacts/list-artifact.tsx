import { fetcher } from '@/utils/helpers/fetcher'
import { filterSearch } from '@/utils/helpers/filter-search'
import { Artifact } from '@prisma/client'
import AlertError from '@/render/components/UI/errors/alert-error'
import ItemArtifact from '@/render/components/panel/artifacts/item-artfact'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'
import useSWR from 'swr'

const ArtifactList = ({ searchValue }: { searchValue: string }) => {
  // Fetch artifacts
  const {
    data: artifacts,
    isLoading,
    error
  } = useSWR<Artifact[]>('/api/artifacts', fetcher)

  const artifactFiltered = filterSearch(searchValue, artifacts)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar los artefactos.' />

  if (isLoading) return <PanelLoader />

  if (!artifacts?.length)
    return <NoItems message='No hay materiales para mostrar' />

  if (!artifactFiltered?.length)
    return (
      <NoItems message='No se ha podido encontrar este cojunto de artefactos.' />
    )

  return (
    <ol className='w-full grid grid-cols-4 gap-4'>
      {artifactFiltered?.map((artifact) => (
        <ItemArtifact key={artifact.id} artifact={artifact} />
      ))}
    </ol>
  )
}

export default ArtifactList
