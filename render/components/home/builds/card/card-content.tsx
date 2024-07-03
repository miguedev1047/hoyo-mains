import { characterType } from '@/types'
import { useViewBuildStore } from '@/utils/store/use-view-build-store'
import { WeaponByCharacter } from '@prisma/client'
import CharacterImage from '@/render/components/home/builds/character-image'
import CardDetails from '@/render/components/home/builds/card/card-details'
import clsx from 'clsx'

interface CardContentProps {
  character: characterType | undefined
  weapons: WeaponByCharacter[] | undefined
  artifacts: WeaponByCharacter[] | undefined
}

const CardContent = ({ character, weapons, artifacts }: CardContentProps) => {
  const isOpen = useViewBuildStore((state) => state.isOpen)

  return (
    <div
      className={clsx(
        'flex justify-between gap-5',
        isOpen ? 'items-start' : 'items-center'
      )}
    >
      <CharacterImage character={character} />
      <CardDetails
        character={character}
        weapons={weapons}
        artifacts={artifacts}
      />
    </div>
  )
}

export default CardContent
