import { cn } from '@/libs/utils'

interface FigureProps {
  children: React.ReactNode
  width?: string
  height?: string
  padding?: string
  radius?: string
  background?: string
  className?: string
}

const Figure = ({
  children,
  width = 'w-32',
  height = 'h-32',
  padding = 'p-0',
  radius = 'rounded-lg',
  background = 'bg-transparent',
  className,
  ...props
}: FigureProps) => {
  const figureClassName = `${background} ${padding} ${width} ${height} ${radius}`

  return (
    <figure
      {...props}
      className={cn(
        `overflow-hidden relative grid place-content-center ${figureClassName}`,
        className
      )}
    >
      {children}
    </figure>
  )
}

export default Figure
