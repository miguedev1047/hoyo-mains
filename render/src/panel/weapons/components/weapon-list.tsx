import { Weapon } from '@prisma/client'
import WeaponItem from '@/render/src/panel/weapons/components/weapon-item'

interface WeaponListProps {
  weapons: Weapon[]
}

const WeaponList = ({ weapons }: WeaponListProps) => {
  return (
    <ol className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {weapons.map((weapon) => (
        <WeaponItem key={weapon.id} weapon={weapon} />
      ))}
    </ol>
  )
}

export default WeaponList
