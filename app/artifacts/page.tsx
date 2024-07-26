import { fetchArtifacts } from '@/render/src/database/artifacts/utilities/services/fetch'
import { Artifact } from '@prisma/client'
import Artifacts from '@/render/src/database/artifacts/artifacts'
import Navigation from '@/render/src/shared/components/navigation'

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
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Artifacts artifacts={artifacts} />
      </main>
    </>
  )
}

export default ArtifactPage
