interface PanelSectionProps {
  children: React.ReactNode
  className?: string
}

const PanelSection = ({ children, className }: PanelSectionProps) => {
  return (
    <div className={`w-full space-y-4 z-20 relative ${className}`}>
      {children}
    </div>
  )
}

export default PanelSection
