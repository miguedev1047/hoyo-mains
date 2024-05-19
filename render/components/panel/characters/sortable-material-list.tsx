import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { Characters } from '@/types'
import { reOrder } from '@/utils/helpers/re-order'
import { updatedOrderMaterial } from '@/render/services/panel/materials/update'
import { toast } from 'sonner'
import ItemCharacterMaterial from '@/render/components/panel/characters/item-character-material'

const SorteableMaterialList = ({ character }: { character: Characters }) => {
  const materials = character?.materials

  const [data, setData] = useState(materials)

  useEffect(() => {
    setData(materials)
  }, [character, materials])

  const onDrageEnd = async (result: any) => {
    const { destination, source, type } = result

    if (!destination) {
      return
    }

    // Si es arrastrado en la misma posicion
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    // Ordenamos es la lista
    if (type === 'list') {
      const items = reOrder(data!, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setData(items)
      const { status, message } = await updatedOrderMaterial(items)
      if (status === 200) {
        toast.success(message)
        return
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDrageEnd}>
      <Droppable droppableId='list' type='list'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {data?.map((material, index) => (
              <ItemCharacterMaterial
                index={index}
                key={material.id}
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
