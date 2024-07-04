import { characterType } from '@/types'
import { ArtifactByCharacter, WeaponByCharacter } from '@prisma/client'
import { ItemBuildFirstArtifact } from '@/render/components/home/builds/items/artifact'
import { ItemCharacterStats } from '@/render/components/home/builds/items/stats'
import { ItemBuildFirstWeapon } from '@/render/components/home/builds/items/weapon'

interface CompactViewProps {
  character: characterType | undefined
  firstWeapon: WeaponByCharacter | undefined
  firstArtifact: ArtifactByCharacter | undefined
}

const CompactView = ({
  character,
  firstWeapon,
  firstArtifact
}: CompactViewProps) => (
  <>
    <div className='w-full col-span-4 xl:col-span-2 space-y-2'>
      <ItemBuildFirstWeapon weapon={firstWeapon!} />
      <ItemBuildFirstArtifact artifact={firstArtifact!} />
    </div>
    <ItemCharacterStats character={character} />
  </>
)

export default CompactView
