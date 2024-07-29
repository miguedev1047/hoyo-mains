import { fetchArtifacts } from '@/render/src/panel/artifacts/utilities/services/fetch'
import { Artifact } from '@prisma/client'
import { IconHourglassEmpty } from '@tabler/icons-react'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import ArtifactMenubar from '@/render/src/panel/artifacts/components/artifact-menubar'
import Artifacts from '@/render/src/panel/artifacts/artifacts'
import ArtifactSheet from '@/render/src/panel/artifacts/components/artifact-sheet'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

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
    <PanelContainer>
      <PanelHeader
        title='Artefactos'
        startContent={<IconHourglassEmpty size={32} />}
      />

      <ArtifactMenubar />

      <Artifacts artifacts={artifacts} />

      <ArtifactSheet />
    </PanelContainer>
  )
}

export default ArtifactsPage
