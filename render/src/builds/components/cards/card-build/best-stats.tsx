import { CharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'

interface BestStatsProps {
  build: CharacterType
}

const BestStats = ({ build }: BestStatsProps) => {
  const bestStats = build?.bestStats

  return (
    <Card className='bg-color-dark text-sm md:text-base text-color-lightest space-y-3 p-2 md:p-4 max-md:rounded-md'>
      <h2>
        <span className='font-bold'>Reloj:</span> {bestStats?.sandStat}
      </h2>
      <h2>
        <span className='font-bold'>Caliz:</span> {bestStats?.globetStat}
      </h2>
      <h2>
        <span className='font-bold'>Tiara:</span> {bestStats?.circletStat}
      </h2>
    </Card>
  )
}

export default BestStats
