import { CharacterTypes } from '@/types'
import CharacterWeaponList from '@/render/components/home/characters/weapons/character-weapon-list'

const CharacterWeapons = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores armas
      </h3>

      <CharacterWeaponList character={character} />
    </div>
  )
}

export default CharacterWeapons
