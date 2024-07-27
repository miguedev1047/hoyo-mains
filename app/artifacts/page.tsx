import { fetchArtifacts } from '@/render/src/database/artifacts/utilities/services/fetch'
import { Artifact } from '@prisma/client'
import Artifacts from '@/render/src/database/artifacts/artifacts'
import Navigation from '@/render/src/shared/components/navigation'
import RootContainer from '@/render/src/shared/components/containers/root-container'

interface ArtifactPageProps {
  searchParams: {
    name: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Artefactos',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

const ArtifactPage = async ({ searchParams }: ArtifactPageProps) => {
  const artifactName = searchParams?.name

  const artifacts = (await fetchArtifacts({ name: artifactName })) as Artifact[]

  return (
    <RootContainer>
      <Artifacts artifacts={artifacts} />
    </RootContainer>
  )
}

export default ArtifactPage
