import { CharacterTypes } from '@/types'
import { Card } from '@nextui-org/card'

const CharacterBestStatsItem = ({
  character
}: {
  character: CharacterTypes
}) => {
  const stats = character?.bestStats
  if (!stats) return null

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Reloj:</span>{' '}
          {stats?.sandStat}
        </h3>
      </Card>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Caliz:</span>{' '}
          {stats?.globetStat}
        </h3>
      </Card>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Tiara:</span>{' '}
          {stats?.circletStat}
        </h3>
      </Card>
      <Card className='col-span-3 bg-color-darkest p-5 capitalize select-none'>
        <h3 className='text-base text-center capitalize font-light'>
          <span className='font-bold'>Substats:</span>{' '}
          {stats?.substatPriority}
        </h3>
      </Card>
    </div>
  )
}

export default CharacterBestStatsItem
