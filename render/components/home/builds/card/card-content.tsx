import { CharacterTypes } from '@/types'
import { WeaponByCharacter } from '@prisma/client'
import CharacterImage from '@/render/components/home/builds/character-image'
import CardDetails from '@/render/components/home/builds/card/card-details'
import ViewToggle from '@/render/components/home/builds/card/view-toggle'
import Link from 'next/link'

interface CardContentProps {
  character: CharacterTypes | undefined
  weapons: WeaponByCharacter[] | undefined
  artifacts: WeaponByCharacter[] | undefined
}

const CardContent = ({ character, weapons, artifacts }: CardContentProps) => {
  const characterId = character?.id

  return (
    <div className='flex justify-between flex-wrap md:flex-nowrap gap-5 items-start'>
      <article className='max-md:w-full flex justify-between items-center'>
        <CharacterImage character={character} />
        <div className='block md:hidden'>
          <ViewToggle characterId={characterId} />
        </div>
      </article>

      <CardDetails
        character={character}
        weapons={weapons}
        artifacts={artifacts}
      />
    </div>
  )
}

export default CardContent
