import { CharacterType } from '@/render/src/types'
import WeaponItem from '@/render/src/builds/components/cards/card-build-expanded/weapon-item'

interface WeaponListProps {
  build: CharacterType
}

const WeaponList = ({ build }: WeaponListProps) => {
  const weapons = build.weapons

  return (
    <div className='space-y-4'>
      <h2 className='text-lg capitalize font-bold text-secondary-color'>
        Mejores armas
      </h2>
      <ol className='space-y-2'>
        {weapons.map((weapon) => (
          <WeaponItem key={weapon.id} weapon={weapon} />
        ))}
      </ol>
    </div>
  )
}

export default WeaponList
