import { characterType } from '@/types'
import { useViewBuildStore } from '@/utils/store/use-view-build-store'
import { ArtifactByCharacter, WeaponByCharacter } from '@prisma/client'
import CompactView from '@/render/components/home/builds/card/compact-view'
import ExpandedView from '@/render/components/home/builds/card/expanded-view'
import ViewToggle from '@/render/components/home/builds/card/view-toggle'

interface CardDetailsProps {
  character: characterType | undefined
  weapons: WeaponByCharacter[] | undefined
  artifacts: ArtifactByCharacter[] | undefined
}

const CardDetails = ({ character, weapons, artifacts }: CardDetailsProps) => {
  const isOpen = useViewBuildStore((state) => state.isOpen)

  return (
    <div className='flex gap-4 items-start'>
      <div className='w-[800px] grid grid-cols-4 gap-2'>
        {!isOpen ? (
          <CompactView
            character={character}
            firstWeapon={weapons![0]}
            firstArtifact={artifacts![0]}
          />
        ) : (
          <ExpandedView
            character={character}
            weapons={weapons}
            artifacts={artifacts}
          />
        )}
      </div>
      <ViewToggle />
    </div>
  )
}

export default CardDetails
