import { CharacterTypes } from '@/types'
import { ArtifactByCharacter, WeaponByCharacter } from '@prisma/client'
import { ItemCharacterStatsFull } from '@/render/components/home/builds/items/stats'
import ListWeapons from '@/render/components/home/builds/items/weapon/list-weapons'
import ListArtifacts from '@/render/components/home/builds/items/artifact/list-artifacts'

interface ExpandedViewProps {
  character: CharacterTypes | undefined
  weapons: WeaponByCharacter[] | undefined
  artifacts: ArtifactByCharacter[] | undefined
}

const ExpandedView = ({ character, weapons, artifacts }: ExpandedViewProps) => (
  <>
    <ListWeapons weapon={weapons} />
    <ListArtifacts artifact={artifacts} />
    <ItemCharacterStatsFull character={character} />
  </>
)

export default ExpandedView
