import { CharacterType } from '@/render/src/types'
import { Card } from '@nextui-org/card'

interface BestStatsViewProps {
  character: CharacterType
}

const BestStatsView = ({ character }: BestStatsViewProps) => {
  const stats = character.bestStats

  return (
    <div className='grid grid-cols-3 gap-1 sm:gap-2 md:gap-4'>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-2 md:p-5 max-md:rounded-md capitalize select-none'>
        <h3 className='text-sm md:text-base text-center capitalize font-light'>
          <span className='font-bold'>Reloj:</span> {stats?.sandStat}
        </h3>
      </Card>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-2 md:p-5 max-md:rounded-md capitalize select-none'>
        <h3 className='text-sm md:text-base text-center capitalize font-light'>
          <span className='font-bold'>Caliz:</span> {stats?.globetStat}
        </h3>
      </Card>
      <Card className='col-span-3 lg:col-span-1 bg-color-darkest p-2 md:p-5 max-md:rounded-md capitalize select-none'>
        <h3 className='text-sm md:text-base text-center capitalize font-light'>
          <span className='font-bold'>Tiara:</span> {stats?.circletStat}
        </h3>
      </Card>
      <Card className='col-span-3 bg-color-darkest p-2 md:p-5 max-md:rounded-md capitalize select-none'>
        <h3 className='text-sm md:text-base text-center capitalize font-light'>
          <span className='font-bold'>Substats:</span> {stats?.substatPriority}
        </h3>
      </Card>
    </div>
  )
}

export default BestStatsView
