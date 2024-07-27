import { Divider } from '@nextui-org/divider'
import { currentUser } from '@/render/src/shared/utilities/auth'
import { IconHome } from '@tabler/icons-react'
import Panel from '@/render/src/panel/home/panel'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Inicio',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const PanelHome = async () => {
  const user = await currentUser()

  return (
    <PanelContainer>
      <PanelHeader title='Inicio' startContent={<IconHome size={32} />} />
      <Divider />
      <Panel user={user} />
    </PanelContainer>
  )
}

export default PanelHome
