import { CharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'

interface SubstatsListProps {
  build: CharacterType
}

const SubstatsList = ({ build }: SubstatsListProps) => {
  const bestStats = build?.bestStats
  const substats = bestStats?.substatPriority.split('>').slice(0, 3)

  return (
    <div className='space-y-4'>
      <h2 className='text-lg capitalize font-bold text-secondary-color'>
        Estadisticas secundarias
      </h2>
      <Card className='bg-color-dark text-color-lightest space-y-3 p-4'>
        <ol className='space-y-3'>
          {substats?.map((substat, index) => (
            <li key={index}>
              <h2>
                <span className='font-bold'>{index}.</span> {substat}
              </h2>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  )
}

export default SubstatsList
