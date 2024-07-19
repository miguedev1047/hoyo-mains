import { CharacterType } from '@/render/src/types'
import WeaponItem from '@/render/src/character/components/weapons/weapon-item'

interface WeaponListProps {
  character: CharacterType
}

const WeaponList = ({ character }: WeaponListProps) => {
  const weapons = character?.weapons ?? []

  return (
    <ol className='w-full space-y-4'>
      {weapons.map((weapon, index) => (
        <li key={weapon.id}>
          <WeaponItem weapon={weapon} index={index} />
        </li>
      ))}
    </ol>
  )
}

export default WeaponList
