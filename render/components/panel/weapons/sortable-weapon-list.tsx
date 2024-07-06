import { updatedOrderWeapon } from '@/render/services/panel/weapons/update'
import { CharacterTypes } from '@/types'
import { reOrder } from '@/utils/helpers/re-order'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { WeaponByCharacter } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import ItemCharacterWeapon from '@/render/components/panel/weapons/item-character-weapon'

const SortableWeaponList = ({
  character
}: {
  character: CharacterTypes | undefined
}) => {
  const weapons = useMemo(() => character?.weapons ?? [], [character])
  const [data, setData] = useState<WeaponByCharacter[]>(weapons)

  useEffect(() => {
    setData(weapons)
  }, [weapons, character])

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
      const { status, message } = await updatedOrderWeapon(items)
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
            {data.map((weapon, index) => (
              <ItemCharacterWeapon
                index={index}
                key={weapon.id}
                weapon={weapon}
                character={character}
              />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableWeaponList
