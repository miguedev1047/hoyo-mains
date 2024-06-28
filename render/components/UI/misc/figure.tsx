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
      className={`w-10 h-10 grid place-items-center ${width} ${height} ${radius} ${className} ${padding} bg-primary-color flex-none relative overflow-hidden`}
    >
      {children}
    </figure>
  )
}

export default Figure