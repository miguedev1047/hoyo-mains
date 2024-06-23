import { characterType } from '@/render/services/home/characters/data'
import CharacterArtifactList from '@/render/components/home/characters/artifacts/character-artifact-list'

const CharacterArtifacts = ({ character }: { character: characterType }) => {
  return (
    <div className='col-span-4 lg:col-span-2 space-y-4'>
      <h3 className='text-xl font-semibold capitalize text-secondary-color'>
        {character?.name} Mejores Artefactos
      </h3>

      <CharacterArtifactList character={character} />
    </div>
  )
}

export default CharacterArtifacts
