import { CharacterType } from '@/render/src/types'
import { Toggle } from '@/render/src/builds/components/toggle'
import CardContainer from '@/render/src/builds/components/cards/card-container'
import WeaponFirstItem from '@/render/src/builds/components/cards/card-build/weapon-first-item'
import ArtifactFirstItem from '@/render/src/builds/components/cards/card-build/artifact-first-item'
import BestStats from '@/render/src/builds/components/cards/card-build/best-stats'
import CharacterImage from '@/render/src/builds/components/character-image'

interface CardBuildProps {
  build: CharacterType
}

const CardBuild = ({ build }: CardBuildProps) => {
  return (
    <CardContainer>
      <div className='flex justify-between items-center gap-4'>
        <CharacterImage build={build} />

        <div className='w-full max-w-[800px] flex items-center'>
          <div className='w-full grid grid-cols-2 gap-2'>
            <div className='space-y-2'>
              <WeaponFirstItem build={build} />
              <ArtifactFirstItem build={build} />
            </div>
            <BestStats build={build} />
          </div>

          <Toggle build={build} />
        </div>
      </div>
    </CardContainer>
  )
}

export default CardBuild
