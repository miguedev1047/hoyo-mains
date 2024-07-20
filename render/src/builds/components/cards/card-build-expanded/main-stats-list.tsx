import { CharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'

interface MainStatsListProps {
  build: CharacterType
}

const MainStatsList = ({ build }: MainStatsListProps) => {
  const bestStats = build?.bestStats

  return (
    <div className='space-y-4'>
      <h2 className='text-lg capitalize font-bold text-secondary-color'>
        Estadisticas principales
      </h2>
      <Card className='bg-color-dark text-color-lightest space-y-3 p-4'>
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
    </div>
  )
}

export default MainStatsList
