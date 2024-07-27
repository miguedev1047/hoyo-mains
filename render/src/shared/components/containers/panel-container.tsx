import { cn } from '@/libs/utils'

interface PanelContainerProps {
  children: React.ReactNode
  className?: string
}

const PanelContainer = ({ children, className }: PanelContainerProps) => {
  return (
    <section className={cn('w-full space-y-4 z-20 relative', className)}>
      {children}
    </section>
  )
}

export default PanelContainer
