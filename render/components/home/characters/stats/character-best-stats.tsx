import { characterType } from '@/render/services/home/characters/data'
import CharacterBestStatsItem from '@/render/components/home/characters/stats/character-best-stats-item'

const CharacterBestStats = ({ character }: { character: characterType }) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Estadísticas
      </h3>
      <CharacterBestStatsItem character={character} />
    </div>
  )
}

export default CharacterBestStats