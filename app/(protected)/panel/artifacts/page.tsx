import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'
import { IconHourglassEmpty } from '@tabler/icons-react'

const ArtifactsPage = () => {
  return (
    <PanelSection>
      <Header
        title='Artefactos'
        startContent={<IconHourglassEmpty size={30} />}
      />

      <div>
        <h1>Artifacts Page</h1>
        <p>
          This is the artifacts page of the panel. You can navigate to different
          sections of the panel using the sidebar.
        </p>
      </div>
    </PanelSection>
  )
}

export default ArtifactsPage
