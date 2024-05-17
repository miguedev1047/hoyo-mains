import { IconHourglassEmpty } from '@tabler/icons-react'
import ArtifactModal from '@/render/components/UI/modal/artifact-modal'
import Header from '@/render/components/panel/header'
import ArtifactSection from '@/render/sections/artifacts/artifact-section'
import PanelSection from '@/render/sections/panel/panel-section'

const ArtifactsPage = () => {
  return (
    <PanelSection>
      <Header
        title='Artefactos'
        startContent={<IconHourglassEmpty size={30} />}
      />

      <ArtifactSection />

      <ArtifactModal />
    </PanelSection>
  )
}

export default ArtifactsPage
