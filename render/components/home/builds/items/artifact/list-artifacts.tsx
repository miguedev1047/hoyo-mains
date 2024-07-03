import { ArtifactByCharacter } from '@prisma/client'
import { ItemBuildArtifact } from '@/render/components/home/builds/items/artifact/index'

const ListArtifacts = ({
  artifact
}: {
  artifact: ArtifactByCharacter[] | undefined
}) => {
  return (
    <div className='col-span-2 space-y-2'>
      <h2>Mejores artefactos</h2>
      <ul className='w-full grid grid-cols-1 gap-2'>
        {artifact?.map((item) => (
          <ItemBuildArtifact artifact={item} key={item.id} />
        ))}
      </ul>
    </div>
  )
}

export default ListArtifacts
