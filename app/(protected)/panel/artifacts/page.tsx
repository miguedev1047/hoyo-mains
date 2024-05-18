import { IconHourglassEmpty } from '@tabler/icons-react'
import ArtifactModal from '@/render/components/UI/modal/artifact-modal'
import Header from '@/render/components/panel/header'
import ArtifactSection from '@/render/sections/artifacts/artifact-section'
import PanelWrapper from '@/render/sections/panel-wrapper'

const ArtifactsPage = () => {
  return (
    <PanelWrapper>
      <Header
        title='Artefactos'
        startContent={<IconHourglassEmpty size={30} />}
      />

      <ArtifactSection />

      <ArtifactModal />
    </PanelWrapper>
  )
}

export default ArtifactsPage
