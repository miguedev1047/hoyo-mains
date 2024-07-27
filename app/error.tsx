'use client'

import RootContainer from '@/render/src/shared/components/containers/root-container'
import { Button } from '@nextui-org/button'
import { useEffect } from 'react'

export async function generateMetadata() {
  return {
    title: 'HoYo Mains | Error'
  }
}

export default function Error({
  error,
  reset
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <RootContainer className='space-y-8'>
      <h2 className='text-4xl font-bold text-center mb-4'>
        Ha ocurrido un error
      </h2>
      <Button className='mx-auto block' onClick={() => reset()}>
        Intentar de nuevo
      </Button>
    </RootContainer>
  )
}
