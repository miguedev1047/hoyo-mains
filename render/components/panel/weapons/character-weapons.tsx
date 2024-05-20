import { Characters } from '@/types'
import SortableWeaponList from '@/render/components/panel/weapons/sortable-weapon-list'
import WeaponSelector from '@/render/components/panel/materials/weapon-selector'

const CharacterWeapons = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-2'>
      <SortableWeaponList character={character} />
      <WeaponSelector character={character} />
    </div>
  )
}

export default CharacterWeapons
