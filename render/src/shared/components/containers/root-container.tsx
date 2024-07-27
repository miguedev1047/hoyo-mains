import React from 'react'
import Navigation from '@/render/src/shared/components/navigation'
import { cn } from '@/libs/utils'

interface RootContainerProps {
  children: React.ReactNode
  className?: string
}

const RootContainer = ({ children, className }: RootContainerProps) => {
  return (
    <>
      <Navigation />
      <main className={cn('max-w-[1280px] my-10 mx-auto', className)}>
        {children}
      </main>
    </>
  )
}

export default RootContainer
