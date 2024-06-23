import { characterType } from '@/render/services/home/characters/data'
import CharacterWeaponItem from '@/render/components/home/characters/weapons/character-weapon-item'

const CharacterWeaponList = ({
  character
}: {
  character: characterType | undefined
}) => {
  const weapons = character?.weapons ?? []

  return (
    <ol className='w-full space-y-4'>
      {weapons.map((weapon) => (
        <li key={weapon.id}>
          <CharacterWeaponItem weapon={weapon} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterWeaponList
