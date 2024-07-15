'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderArtifact } from '@/render/src/panel/character/artifacts/utilities/services/update'
import { CharacterType } from '@/render/src/types'
import ArtifactItem from '@/render/src/panel/character/artifacts/components/artifact-item'

interface SortableArtifactListProps {
  character: CharacterType
}

const SortableArtifactList = ({ character }: SortableArtifactListProps) => {
  const { orderedList, onDragEnd } = useDrag({
    item: character.artifacts,
    name: 'artifactList',
    callback: updatedOrderArtifact
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='artifactList' type='artifactList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((artifact, index) => (
              <ArtifactItem
                key={artifact.id}
                artifact={artifact}
                index={index}
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
