interface PanelWrapperProps {
  children: React.ReactNode
  className?: string
}

const PanelWrapper = ({ children, className }: PanelWrapperProps) => {
  return (
    <div className={`w-full space-y-4 z-20 relative ${className}`}>
      {children}
    </div>
  )
}

export default PanelWrapper
