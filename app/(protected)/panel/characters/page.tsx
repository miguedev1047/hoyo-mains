import { IconUsers } from '@tabler/icons-react'
import Header from '@/render/components/panel/header'
import PanelSection from '@/render/sections/panel/panel-section'

const CharactersPage = () => {
  return (
    <PanelSection>
      <Header title='Personajes' startContent={<IconUsers size={40} />} />

      <div>
        <h1>Characters Page</h1>
        <p>
          This is the characters page of the panel. You can navigate to
          different sections of the panel using the sidebar.
        </p>
      </div>
    </PanelSection>
  )
}

export default CharactersPage
