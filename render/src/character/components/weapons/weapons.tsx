import { CharacterType } from '@/render/src/types'
import WeaponList from '@/render/src/character/components/weapons/weapon-list'

interface WeaponsProps {
  character: CharacterType
}

const Weapons = ({ character }: WeaponsProps) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores armas
      </h3>

      <WeaponList character={character} />
    </div>
  )
}

export default Weapons
