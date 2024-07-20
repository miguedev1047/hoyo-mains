import { CharacterType } from '@/render/src/types'
import { Toggle } from '@/render/src/builds/components/toggle'
import CardContainer from '@/render/src/builds/components/cards/card-container'
import CharacterImage from '@/render/src/builds/components/character-image'
import WeaponList from '@/render/src/builds/components/cards/card-build-expanded/weapon-list'
import ArtifactList from '@/render/src/builds/components/cards/card-build-expanded/artifact-list'
import MainStatsList from '@/render/src/builds/components/cards/card-build-expanded/main-stats-list'
import SubstatsList from '@/render/src/builds/components/cards/card-build-expanded/substats-list'

interface CardBuildExpandedProps {
  build: CharacterType
}

const CardBuildExpanded = ({ build }: CardBuildExpandedProps) => {
  return (
    <CardContainer>
      <div className='flex justify-between flex-wrap items-start gap-4'>
        <div className='max-xl:w-full flex items-center justify-between'>
          <CharacterImage build={build} />
          <div className='block xl:hidden'>
            <Toggle build={build} />
          </div>
        </div>

        <div className='w-full xl:max-w-[800px] flex items-start'>
          <div className='w-full grid grid-cols-1 lg:grid-cols-2 gap-2 gap-y-8'>
            <WeaponList build={build} />
            <ArtifactList build={build} />
            <MainStatsList build={build} />
            <SubstatsList build={build} />
          </div>

          <div className='max-xl:hidden'>
            <Toggle build={build} />
          </div>
        </div>
      </div>
    </CardContainer>
  )
}

export default CardBuildExpanded
