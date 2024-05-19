import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useMemo, useState } from 'react'
import { Characters } from '@/types'
import { reOrder } from '@/utils/helpers/re-order'
import { updatedOrderMaterial } from '@/render/services/panel/materials/update'
import { MaterialsByCharacter } from '@prisma/client'
import { toast } from 'sonner'
import ItemCharacterMaterial from '@/render/components/panel/characters/item-character-material'

const SorteableMaterialList = ({
  character
}: {
  character: Characters | undefined
}) => {
  const materials = useMemo(() => character?.materials ?? [], [character])
  const [data, setData] = useState<MaterialsByCharacter[]>(materials)

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
      const { status, message } = await updatedOrderMaterial(items)
      if (status === 200) {
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
            {data.map((material, index) => (
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
