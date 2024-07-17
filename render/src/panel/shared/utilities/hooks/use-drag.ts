import { useEffect, useState } from 'react'
import { reOrder } from '@/render/src/panel/shared/utilities/helpers/re-order'
import { toast } from 'sonner'

export interface DragTypes {
  item: Array<any>
  name: string
  callback: (items: Array<any>) => Promise<any>
}

export const useDrag = ({ item, name, callback }: DragTypes) => {
  const [orderedList, setOrderedList] = useState<Array<any>>(item)

  useEffect(() => {
    setOrderedList(item)
  }, [item])

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
    if (type === name) {
      const items = reOrder(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )

      setOrderedList(items)

      const { status, message } = await callback(items)
      if (status === 201) {
        toast.success(message)
        return
      }
    }
  }

  return { orderedList, onDragEnd }
}
