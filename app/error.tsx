'use client'

import { Button } from '@nextui-org/button'
import { useEffect } from 'react'

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
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
