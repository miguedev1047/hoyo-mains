import { characterType } from '@/types'
import { Card } from '@nextui-org/card'

export const ItemCharacterStatsFull = ({
  character
}: {
  character: characterType | undefined
}) => {
  const stats = character?.bestStats
  if (!stats) return null

  const priorityStats = stats?.substatPriority.split('>')

  return (
    <div className='w-full col-span-4 flex-wrap xl:flex-nowrap flex gap-2 mt-2'>
      <div className='w-full space-y-2'>
        <h2>Mejores Estadisticas</h2>
        <Card className='p-2 lg:p-4 min-h-[152px] bg-color-dark rounded-md flex justify-center'>
          <div className='space-y-2'>
            <h2 className='text-sm lg:text-base line-clamp-1'>
              <span className='font-bold'>Reloj</span>: {stats?.sandStat}
            </h2>
            <h2 className='text-sm lg:text-base line-clamp-1'>
              <span className='font-bold'>Caliz</span>: {stats?.globetStat}
            </h2>
            <h2 className='text-sm lg:text-base line-clamp-1'>
              <span className='font-bold'>Tiara</span>: {stats?.circletStat}
            </h2>
          </div>
        </Card>
      </div>
      <div className='w-full space-y-2'>
        <h2>Mejores Estadisticas Secundarias</h2>
        <Card className='p-2 lg:p-4 min-h-[152px] bg-color-dark rounded-md flex justify-center'>
          <ol className='space-y-2'>
            {priorityStats?.map((stat, index) => (
              <li key={index}>
                <h2 className='text-sm lg:text-base line-clamp-1'>
                  <span className='font-bold'>{index++ + 1}</span>. {stat}
                </h2>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  )
}

export const ItemCharacterStats = ({
  character
}: {
  character: characterType | undefined
}) => {
  const stats = character?.bestStats

  return (
    <Card className='w-full h-full p-4 col-span-4 xl:col-span-2 bg-color-dark rounded-md flex justify-center'>
      <div className='space-y-2'>
        <h2 className='text-sm lg:text-base line-clamp-1'>
          <span className='font-bold'>Reloj</span>: {stats?.sandStat}
        </h2>
        <h2 className='text-sm lg:text-base line-clamp-1'>
          <span className='font-bold'>Caliz</span>: {stats?.globetStat}
        </h2>
        <h2 className='text-sm lg:text-base line-clamp-1'>
          <span className='font-bold'>Tiara</span>: {stats?.circletStat}
        </h2>
      </div>
    </Card>
  )
}
