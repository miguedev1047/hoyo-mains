import { CharacterType } from '@/render/src/types'
import BestStatsView from '@/render/src/panel/character/best-stats/components/best-stats-view'
import BestStatsForm from '@/render/src/panel/character/best-stats/components/best-stats-form'

interface CharacterProps {
  character: CharacterType
}

const BestStats = ({ character }: CharacterProps) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Estadísticas
      </h3>

      <BestStatsForm character={character} />
      <BestStatsView character={character} />
    </div>
  )
}

export default BestStats
