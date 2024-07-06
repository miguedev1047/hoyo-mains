import { CharacterTypes } from '@/types'
import CharacterArtifactItem from '@/render/components/home/characters/artifacts/character-artifact-item'

const CharacterArtifactList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const arfifacts = character?.artifacts ?? []

  return (
    <ol className='w-full space-y-4'>
      {arfifacts.map((artifact, index) => (
        <li key={artifact.id}>
          <CharacterArtifactItem artifact={artifact} index={index} />
        </li>
      ))}
    </ol>
  )
}

export default CharacterArtifactList
