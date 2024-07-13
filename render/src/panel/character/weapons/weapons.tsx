import { CharacterType } from '@/render/src/types'
import SortableWeaponList from '@/render/src/panel/character/weapons/components/sortable-weapon-list'
import WeaponSelector from '@/render/src/panel/character/weapons/components/weapon-selector'

interface WeaponProps {
    character: CharacterType
}

const Weapons = ({ character }: WeaponProps) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Armas
      </h3>

      <SortableWeaponList character={character} />
      <WeaponSelector character={character} />
    </div>
  )
}

export default Weapons
