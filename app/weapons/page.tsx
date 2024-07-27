import { WeaponType } from '@/render/src/types'
import { fetchWeapons } from '@/render/src/database/weapons/utilities/services/fetch'
import RootContainer from '@/render/src/shared/components/containers/root-container'
import Weapons from '@/render/src/database/weapons/weapon'

interface WeaponsPageProps {
  searchParams: {
    name: string
    stars: string
    type: string
  }
}

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Armas',
    description:
      'HoYo Mains es una comunidad de Genshin Impact en español. Aquí encontrarás guías, builds, y más sobre el juego.'
  }
}

const WeaponsPage = async ({ searchParams }: WeaponsPageProps) => {
  const { name, stars, type } = {
    name: searchParams?.name,
    stars: parseInt(searchParams?.stars),
    type: searchParams?.type
  }

  const weapons = (await fetchWeapons({ name, stars, type })) as WeaponType[]

  return (
    <RootContainer>
      <Weapons weapons={weapons} />
    </RootContainer>
  )
}

export default WeaponsPage
