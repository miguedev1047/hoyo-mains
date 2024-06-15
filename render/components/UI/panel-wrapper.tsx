interface PanelWrapperProps {
  children: React.ReactNode
  className?: string
}

const PanelWrapper = ({ children, className }: PanelWrapperProps) => {
  return (
    <section className={`w-full space-y-4 z-20 relative ${className ?? ''}`}>
      {children}
    </section>
  )
}

export default PanelWrapper
