import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { CharacterType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import { updatedOrderMaterial } from '../services/update'
import MaterialItem from './material-item'

const SorteableMaterialList = ({ character }: { character: CharacterType }) => {
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

export default SorteableMaterialList
