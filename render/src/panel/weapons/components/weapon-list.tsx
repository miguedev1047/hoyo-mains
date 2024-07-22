import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import { Weapon } from '@prisma/client'
import WeaponItem from '@/render/src/panel/weapons/components/weapon-item'

interface WeaponListProps {
  weapons: Weapon[]
}

const WeaponList = ({ weapons }: WeaponListProps) => {
  if (!weapons.length) {
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron materiales</NotFoundTitle>
      </NotFound>
    )
  }
  return (
    <ol className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
      {weapons.map((weapon) => (
        <WeaponItem key={weapon.id} weapon={weapon} />
      ))}
    </ol>
  )
}

export default WeaponList
