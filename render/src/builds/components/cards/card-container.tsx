import { cn } from '@/libs/utils'
import { Card } from '@nextui-org/card'

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

const CardContainer = ({ children, className }: CardContainerProps) => {
  return <Card className={cn('p-4 bg-color-darkest', className)}>{children}</Card>
}

export default CardContainer
