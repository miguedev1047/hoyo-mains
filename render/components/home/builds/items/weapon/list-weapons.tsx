import { WeaponByCharacter } from '@prisma/client'
import { ItemBuildWeapon } from '@/render/components/home/builds/items/weapon/index'

const ListWeapons = ({
  weapon
}: {
  weapon: WeaponByCharacter[] | undefined
}) => {
  return (
    <div className='col-span-2 space-y-2'>
      <h2>Mejores armas</h2>
      <ul className='w-full grid grid-cols-1 gap-2'>
        {weapon?.map((item) => (
          <ItemBuildWeapon weapon={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

export default ListWeapons
