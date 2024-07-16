/**
 * Get dragging style
 * @param isDragging
 * @param index
 * @param marginClass
 */

interface GetDraggingStyleProps {
  isDragging: boolean
  marginClass: string
  index: number
}

export function getDraggingStyle({
  isDragging,
  marginClass,
  index
}: GetDraggingStyleProps) {
  const margin = index < 3 ? marginClass : ''
  const isDraggingStyle = isDragging ? 'border-[2px] border-lightest  transition-all ease-in-out duration-300' : ''

  return `${margin} ${isDraggingStyle}`
}
