import { currentUser } from '@/data/auth'
import { IconHome } from '@tabler/icons-react'
import { Divider } from '@nextui-org/divider'
import Header from '@/render/components/panel/header'
import PanelWrapper from '@/render/components/UI/panel-wrapper'
import HomeSection from '@/render/sections/panel/home-section'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Inicio',
    description: 'Panel de administración de HoYo Mains.'
  }
}

const PanelHome = async () => {
  const user = await currentUser()
  
  return (
    <PanelWrapper>
      <Header title='Inicio' startContent={<IconHome size={32} />} />

      <Divider />

      <HomeSection user={user!} />
    </PanelWrapper>
  )
}

export default PanelHome
