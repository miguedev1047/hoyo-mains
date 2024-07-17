import { IconSword } from '@tabler/icons-react'
import { fetchWeapons } from '@/render/src/panel/weapons/utilities/services/fetch'
import { Weapon } from '@prisma/client'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import PanelWrapper from '@/render/src/panel/shared/components/ui/panel-wrapper'
import WeaponMenubar from '@/render/src/panel/weapons/components/weapon-menubar'
import Weapons from '@/render/src/panel/weapons/weapons'
import WeaponModal from '@/render/src/panel/weapons/components/weapon-modal'

export async function generateMetadata() {
  return {
    title: 'HoYo Panel | Armas',
    description: 'Panel de administración de HoYo Mains.'
  }
}

interface WeaponsPageProps {
  searchParams: {
    name: string
    stars: string
    type: string
  }
}

const WeaponsPage = async ({ searchParams }: WeaponsPageProps) => {
  const { name, stars, type } = {
    name: searchParams.name?.toLocaleLowerCase(),
    type: searchParams?.type,
    stars: parseInt(searchParams?.stars)
  }

  const weapons = (await fetchWeapons({ name, stars, type })) as Weapon[]

  return (
    <PanelWrapper>
      <PanelHeader title='Armas' startContent={<IconSword size={32} />} />

      <WeaponMenubar />

      <Weapons weapons={weapons} />

      <WeaponModal />
    </PanelWrapper>
  )
}

export default WeaponsPage
