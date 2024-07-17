import { Weapon } from '@prisma/client'
import {
  NotFound,
  NotFoundTitle
} from '@/render/src/panel/shared/components/ui/no-items-found'
import WeaponList from '@/render/src/panel/weapons/components/weapon-list'

interface WeaponsProps {
  weapons: Weapon[]
}

const Weapons = ({ weapons }: WeaponsProps) => {
  if (!weapons?.length)
    return (
      <NotFound>
        <NotFoundTitle>No se encontraron armas.</NotFoundTitle>
      </NotFound>
    )

  return <WeaponList weapons={weapons} />
}

export default Weapons
