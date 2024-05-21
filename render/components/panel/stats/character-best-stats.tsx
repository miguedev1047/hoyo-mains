import { Characters } from '@/types'
import FormBestStat from '@/render/components/panel/stats/form-best-stat'
import ItemBestStat from '@/render/components/panel/stats/item-best-stats'

const CharacterBestStats = ({
  character
}: {
  character: Characters | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        {character?.name} Mejores Estadísticas
      </h3>
      <FormBestStat character={character} />
      <ItemBestStat character={character} />
    </div>
  )
}

export default CharacterBestStats
