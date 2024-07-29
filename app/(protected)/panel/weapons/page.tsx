import { IconSword } from '@tabler/icons-react'
import { fetchWeapons } from '@/render/src/panel/weapons/utilities/services/fetch'
import { Weapon } from '@prisma/client'
import PanelHeader from '@/render/src/panel/shared/components/ui/panel-header'
import WeaponMenubar from '@/render/src/panel/weapons/components/weapon-menubar'
import Weapons from '@/render/src/panel/weapons/weapons'
import WeaponSheet from '@/render/src/panel/weapons/components/weapon-sheet'
import PanelContainer from '@/render/src/shared/components/containers/panel-container'

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
    name: searchParams.name,
    type: searchParams?.type,
    stars: parseInt(searchParams?.stars)
  }

  const weapons = (await fetchWeapons({ name, stars, type })) as Weapon[]

  return (
    <PanelContainer>
      <PanelHeader title='Armas' startContent={<IconSword size={32} />} />

      <WeaponMenubar />

      <Weapons weapons={weapons} />

      <WeaponSheet />
    </PanelContainer>
  )
}

export default WeaponsPage
