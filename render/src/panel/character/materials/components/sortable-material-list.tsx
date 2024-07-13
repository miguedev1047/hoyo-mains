'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { CharacterType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderMaterial } from '@/render/src/panel/character/materials/services/update'
import MaterialItem from '@/render/src/panel/character/materials/components/material-item'

interface SortebleMaterialListProps {
  character: CharacterType
}

const SortableMaterialList = ({ character }: SortebleMaterialListProps) => {
  const { orderedList, onDragEnd } = useDrag({
    item: character.materials,
    name: 'materialList',
    callback: updatedOrderMaterial
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='materialList' type='materialList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((material, index) => (
              <MaterialItem
                key={material.id}
                index={index}
                material={material}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableMaterialList
