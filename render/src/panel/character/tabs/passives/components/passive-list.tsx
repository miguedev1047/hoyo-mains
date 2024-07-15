import { CharacterType, PassivesType } from '@/render/src/types'
import PassiveItem from '@/render/src/panel/character/tabs/passives/components/passive-item'

interface PassivesListProps {
  character: CharacterType
}

const PassiveList = ({ character }: PassivesListProps) => {
  const passives = character.passives as PassivesType[]

  return (
    <ol className='w-full grid grid-cols-1 gap-4'>
      {passives.map((passive) => (
        <PassiveItem key={passive.id} passive={passive} />
      ))}
    </ol>
  )
}

export default PassiveList
