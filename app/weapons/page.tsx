import { WeaponType } from '@/render/src/types'
import { fetchWeapons } from '@/render/src/database/weapons/utilities/services/fetch'
import Navigation from '@/render/src/shared/components/navigation'
import Weapons from '@/render/src/database/weapons/weapon'

interface WeaponsPageProps {
  searchParams: {
    name: string
    stars: string
    type: string
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
    <>
      <Navigation />
      <main className='max-w-[1280px] my-10 mx-auto'>
        <Weapons weapons={weapons} />
      </main>
    </>
  )
}

export default WeaponsPage
