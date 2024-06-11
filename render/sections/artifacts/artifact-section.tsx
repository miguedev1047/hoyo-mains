'use client'

import { Artifact } from '@prisma/client'
import { Divider } from '@nextui-org/divider'
import { fetcher } from '@/utils/helpers/fetcher'
import { Input } from '@nextui-org/input'
import ItemArtifact from '@/render/components/panel/artifacts/item-artfact'
import AlertError from '@/render/components/UI/errors/alert-error'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'
import useSWR from 'swr'

const ArtifactSection = () => {
  return (
    <section className='space-y-4'>
      <Divider />
      <ArtifactList />
    </section>
  )
}

const ArtifactList = () => {
  // Fetch artifacts
  const {
    data: artifacts,
    isLoading,
    error
  } = useSWR<Artifact[]>('/api/artifacts', fetcher)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar los artefactos.' />

  if (isLoading) return <PanelLoader />

  if (!artifacts?.length)
    return <NoItems message='No hay materiales para mostrar' />

  return (
    <ol className='w-full grid grid-cols-4 gap-4'>
      <Input />
      
      {artifacts.map((artifact) => (
        <ItemArtifact key={artifact.id} artifact={artifact} />
      ))}
    </ol>
  )
}

export default ArtifactSection
