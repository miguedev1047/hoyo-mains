interface FigureProps {
  children: React.ReactNode
  width?: string
  height?: string
  padding?: string
  background?: string
  className?: string
}

const Figure = ({
  children,
  width = 'w-32',
  height = 'h-32',
  padding = 'p-0',
  background = 'bg-transparent',
  className,
  ...props
}: FigureProps) => {
  const figureClassName = `${background} ${padding} ${width} ${height} ${className}`

  return (
    <figure {...props} className={figureClassName}>
      {children}
    </figure>
  )
}

export default Figure
