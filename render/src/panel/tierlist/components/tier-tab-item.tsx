import { CharacterType, TierlistType } from '@/render/src/types'
import { Card } from '@nextui-org/card'
import { tierColor } from '@/render/src/panel/shared/utilities/helpers/tier-color'
import { cn } from '@/libs/utils'
import CharacterSelector from '@/render/src/panel/tierlist/components/character-selector'
import CharacterList from '@/render/src/panel/tierlist/components/character-list'

interface TierlistTabItemProps {
  tier: TierlistType
  tierlist: TierlistType
  characters: CharacterType[]
}
const TierTabItem = ({ tier, tierlist, characters }: TierlistTabItemProps) => {
  const characterTierList = tier.characters

  return (
    <div className='flex items-center gap-2'>
      <Card
        key={tier.id}
        className={cn(
          'p-5 w-1/3 h-40 flex shadow-none items-center justify-center',
          tierColor(tier.name)
        )}
      >
        <h3 className='text-3xl font-bold text-center uppercase'>
          {tier.name}
        </h3>
      </Card>

      <Card className='bg-color-dark shadow-none w-full h-full p-5 grid grid-cols-8 gap-4'>
        <CharacterList characters={characterTierList} />

        <CharacterSelector
          tier={tier}
          tierlist={tierlist}
          characters={characters}
          disabledItems={characterTierList}
        />
      </Card>
    </div>
  )
}

export default TierTabItem
