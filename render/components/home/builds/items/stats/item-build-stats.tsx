import { characterType } from '@/types'
import { Card } from '@nextui-org/card'

const ItemCharacterStats = ({
  character
}: {
  character: characterType | undefined
}) => {
  const stats = character?.bestStats

  return (
    <Card className='w-full h-full p-4 col-span-2 bg-color-darkest rounded-md flex justify-center'>
      <div className='space-y-2'>
        <h2>
          <span className='font-bold'>Reloj</span>: {stats?.sandStat}
        </h2>
        <h2>
          <span className='font-bold'>Caliz</span>: {stats?.globetStat}
        </h2>
        <h2>
          <span className='font-bold'>Tiara</span>: {stats?.circletStat}
        </h2>
      </div>
    </Card>
  )
}

export default ItemCharacterStats
