import { fetchArtifacts } from '@/render/src/panel/artifacts/utilities/services/fetch'
import { Artifact } from '@prisma/client'
import { IconHourglassEmpty } from '@tabler/icons-react'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import ArtifactMenubar from '@/render/src/panel/artifacts/components/artifact-menubar'
import Artifacts from '@/render/src/panel/artifacts/artifacts'
import ArtifactModal from '@/render/src/panel/artifacts/components/artifact-modal'
import PanelWrapper from '@/render/src/panel/shared/components/ui/panel-wrapper'

interface ArtifactsPageProps {
  searchParams: {
    name: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Artefactos',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const ArtifactsPage = async ({ searchParams }: ArtifactsPageProps) => {
  const name = searchParams.name

  const artifacts = (await fetchArtifacts({ name })) as Artifact[]

  return (
    <PanelWrapper>
      <PanelHeader
        title='Artefactos'
        startContent={<IconHourglassEmpty size={32} />}
      />

      <ArtifactMenubar />

      <Artifacts artifacts={artifacts} />

      <ArtifactModal />
    </PanelWrapper>
  )
}

export default ArtifactsPage
