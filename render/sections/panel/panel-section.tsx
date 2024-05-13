interface PanelSectionProps {
  children: React.ReactNode
  className?: string
}

const PanelSection = ({ children, className }: PanelSectionProps) => {
  return (
    <section className={`w-full space-y-4 z-20 relative ${className}`}>
      {children}
    </section>
  )
}

export default PanelSection
