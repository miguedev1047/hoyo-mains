import { IconGripVertical } from '@tabler/icons-react'
import { fetcher } from '@/utils/helpers/fetcher'
import { Weapon } from '@prisma/client'
import { CharacterMaterialItemError } from '@/render/components/UI/errors/character-error'
import { Draggable } from '@hello-pangea/dnd'
import { Data } from '@/types'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/react'
import ButtonDeleteArtifact from '@/render/components/UI/buttons/artifact/button-delete-artifact'
import SkeletonMaterialItems from '@/render/components/UI/skeletons/skeleton-material-items'
import useSWR from 'swr'

const ItemCharacterArtifact = ({
  artifact,
  index
}: {
  artifact: Data
  index: number
}) => {
  const {
    data: dataArtifact,
    isLoading,
    error
  } = useSWR<Weapon>(`/api/artifacts/artifact/${artifact.item}`, fetcher)

  if (error)
    return (
      <CharacterMaterialItemError message='Ha ocurrido un error al cargar el artefacto.' />
    )

  if (isLoading) return <SkeletonMaterialItems />

  return (
    <Draggable draggableId={artifact.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='mb-4'
        >
          <Card className='flex flex-row items-center justify-between gap-4 p-5 bg-color-darkest'>
            <div className='flex gap-4  select-none'>
              <div className='flex gap-7 items-center'>
                <IconGripVertical size={20} />
                <Image
                  width={32}
                  height={32}
                  src={dataArtifact?.imageUrl!}
                  alt={dataArtifact?.name!}
                  className='w-8 h-8 rounded-full'
                />
              </div>
              <h3 className='text-lg font-semibold'>{dataArtifact?.name}</h3>
            </div>

            <ButtonDeleteArtifact artifact={artifact} />
          </Card>
        </li>
      )}
    </Draggable>
  )
}

export default ItemCharacterArtifact
