import { cn } from '@/libs/utils'
import { Card } from '@nextui-org/card'

interface CardContainerProps {
  children: React.ReactNode
  className?: string
  isExpanded?: boolean
}

const CardContainer = ({
  children,
  className,
  isExpanded = false
}: CardContainerProps) => {
  return (
    <Card
      className={cn(
        'p-4 bg-color-darkest',
        isExpanded && 'border border-color-success',
        className
      )}
    >
      {children}
    </Card>
  )
}

export default CardContainer
