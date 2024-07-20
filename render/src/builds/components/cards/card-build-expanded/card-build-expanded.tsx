import { CharacterType } from '@/render/src/types'
import { Toggle } from '@/render/src/builds/components/toggle'
import CardContainer from '@/render/src/builds/components/cards/card-container'
import CharacterImage from '@/render/src/builds/components/character-image'
import WeaponList from '@/render/src/builds/components/cards/card-build-expanded/lists/weapon-list'
import ArtifactList from '@/render/src/builds/components/cards/card-build-expanded/lists/artifact-list'

interface CardBuildExpandedProps {
  build: CharacterType
}

const CardBuildExpanded = ({ build }: CardBuildExpandedProps) => {
  return (
    <CardContainer>
      <div className='flex justify-between items-start gap-4'>
        <CharacterImage build={build} />

        <div className='w-full max-w-[800px] flex items-center'>
          <div className='w-full grid grid-cols-2 gap-2'>
            <WeaponList build={build} />
            <ArtifactList build={build} />
          </div>

          <Toggle build={build} />
        </div>
      </div>
    </CardContainer>
  )
}

export default CardBuildExpanded
