import { CharacterType } from '@/render/src/types'
import BestStatsView from '@/render/src/character/components/best-stats/best-stats-view'

interface BestStatsProps {
  character: CharacterType
}

const BestStats = ({ character }: BestStatsProps) => {
  return (
    <div className='w-full col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores estadísticas
      </h3>

      <BestStatsView character={character} />
    </div>
  )
}

export default BestStats
