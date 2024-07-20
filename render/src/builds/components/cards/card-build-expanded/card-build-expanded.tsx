import { CharacterType } from '@/render/src/types'
import { Toggle } from '@/render/src/builds/components/toggle'
import CardContainer from '@/render/src/builds/components/cards/card-container'
import CharacterImage from '@/render/src/builds/components/character-image'
import WeaponList from '@/render/src/builds/components/cards/card-build-expanded/weapon-list'
import ArtifactList from '@/render/src/builds/components/cards/card-build-expanded/artifact-list'
import MainStatsList from './main-stats-list'
import SubstatsList from './substats-list'

interface CardBuildExpandedProps {
  build: CharacterType
}

const CardBuildExpanded = ({ build }: CardBuildExpandedProps) => {
  return (
    <CardContainer>
      <div className='flex justify-between items-start gap-4'>
        <CharacterImage build={build} />

        <div className='w-full max-w-[800px] flex items-start'>
          <div className='w-full grid grid-cols-2 gap-2 gap-y-8'>
            <WeaponList build={build} />
            <ArtifactList build={build} />
            <MainStatsList build={build} />
            <SubstatsList build={build} />
          </div>

          <Toggle build={build} />
        </div>
      </div>
    </CardContainer>
  )
}

export default CardBuildExpanded
