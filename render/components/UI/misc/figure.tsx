interface FigureProps {
  width?: string
  height?: string
  radius?: string
  padding?: string
  className?: string
  children: React.ReactNode
}

const Figure = ({
  width = 'w-10',
  height = 'h-10',
  padding = 'p-1',
  radius = 'rounded-md',
  className,
  children
}: FigureProps) => {
  return (
    <figure
      className={`grid place-items-center bg-primary-color flex-none relative overflow-hidden ${className} ${width} ${height} ${radius} ${padding}`}
    >
      {children}
    </figure>
  )
}

export default Figure
