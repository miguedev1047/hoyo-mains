import { Characters } from '@/types'
import SortableWeaponList from '@/render/components/panel/weapons/sortable-weapon-list'
import WeaponSelector from '@/render/components/panel/weapons/weapon-selector'

const CharacterWeapons = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Armas
      </h3>
      <SortableWeaponList character={character} />
      <WeaponSelector character={character} />
    </div>
  )
}

export default CharacterWeapons
