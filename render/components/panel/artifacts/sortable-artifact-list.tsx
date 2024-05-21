import { updatedOrderArtifact } from '@/render/services/panel/artifacts/update'
import { Characters } from '@/types'
import { reOrder } from '@/utils/helpers/re-order'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { ArtifactByCharacter } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import ItemCharacterArtifact from '@/render/components/panel/artifacts/item-character-artifact'

const SortableArtifactList = ({
  character
}: {
  character: Characters | undefined
}) => {
  const artifacts = useMemo(() => character?.artifacts ?? [], [character])
  const [data, setData] = useState<ArtifactByCharacter[]>(artifacts)

  useEffect(() => {
    setData(artifacts)
  }, [artifacts, character])

  const onDragEnd = async (result: any) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // Si es arrastrado en la misma posición
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Ordenamos en la lista
    if (type === 'list') {
      const items = reOrder(data, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setData(items)
      const { status, message } = await updatedOrderArtifact(items)
      if (status === 201) {
        toast.success(message)
        return
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='list' type='list'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {data.map((artifact, index) => (
              <ItemCharacterArtifact
                index={index}
                key={artifact.id}
                artifact={artifact}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableArtifactList
