import { characterType } from '@/render/services/home/characters/data'
import CharacterArtifactItem from '@/render/components/home/characters/artifacts/character-artifact-item'

const CharacterArtifactList = ({ character }: { character: characterType }) => {
  const arfifacts = character.artifacts ?? []

  return (
    <ol className='w-full space-y-4'>
      {arfifacts.map((artifact) => (
        <li key={artifact.id}>
          <CharacterArtifactItem artifact={artifact} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterArtifactList