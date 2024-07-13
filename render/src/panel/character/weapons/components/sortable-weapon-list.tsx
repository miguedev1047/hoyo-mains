'use client'

import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { updatedOrderWeapon } from '@/render/src/panel/character/weapons/services/update'
import { CharacterType } from '@/render/src/types'
import { useDrag } from '@/render/src/panel/shared/utilities/hooks/use-drag'
import WeaponItem from '@/render/src/panel/character/weapons/components/weapon-item'

interface SortableWeaponListProps {
  character: CharacterType
}

const SortableWeaponList = ({ character }: SortableWeaponListProps) => {
  const { orderedList, onDragEnd } = useDrag({
    item: character.weapons,
    name: 'weaponList',
    callback: updatedOrderWeapon
  })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='weaponList' type='weaponList'>
        {(provided) => (
          <ol ref={provided.innerRef} {...provided.droppableProps}>
            {orderedList.map((weapon, index) => (
              <WeaponItem key={weapon.id} index={index} weapon={weapon} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default SortableWeaponList
