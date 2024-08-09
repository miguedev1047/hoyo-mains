import { CharacterType, TierlistType } from '@/render/src/types'
import TierlistTabList from '@/render/src/panel/tierlist/components/tierlist-tab-list'

interface TierlistProps {
  tierlists: TierlistType[]
  characters: CharacterType[]
}

const Tierlist = ({ tierlists, characters }: TierlistProps) => {
  return <TierlistTabList tierlists={tierlists} characters={characters} />
}

export default Tierlist
