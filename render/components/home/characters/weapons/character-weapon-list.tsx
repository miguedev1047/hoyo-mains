import { CharacterTypes } from '@/types'
import CharacterWeaponItem from '@/render/components/home/characters/weapons/character-weapon-item'

const CharacterWeaponList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const weapons = character?.weapons ?? []

  return (
    <ol className='w-full space-y-4'>
      {weapons. map((weapon, index) => (
        <li key={weapon.id}>
          <CharacterWeaponItem weapon={weapon} index={index} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterWeaponList
