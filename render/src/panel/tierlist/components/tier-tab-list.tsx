import { CharacterType, TierlistType } from '@/render/src/types'
import TierTabItem from '@/render/src/panel/tierlist/components/tier-tab-item'

interface TierTabListProps {
  tierlists: TierlistType
  characters: CharacterType[]
}

const TierTabList = ({ tierlists, characters }: TierTabListProps) => {
  const tiers = tierlists.tier as any as TierlistType[]

  return (
    <ol className='grid grid-cols-1 gap-2'>
      {tiers.map((tier) => (
        <TierTabItem
          key={tier.id}
          tier={tier}
          tierlist={tierlists}
          characters={characters}
        />
      ))}
    </ol>
  )
}

export default TierTabList
