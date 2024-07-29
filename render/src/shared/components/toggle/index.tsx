'use client'

import { Button } from '@nextui-org/button'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Tooltip } from '@nextui-org/react'
import { useMediaQuery } from '@//render/src/shared/utilities/hooks/use-media-query'
import clsx from 'clsx'

const useToggle = ({
  target,
  name
}: {
  target: string | undefined
  name: string
}) => {
  const searchParams = useSearchParams()
  const q = new URLSearchParams(searchParams).get(name)?.toString()

  const handleToggle = ({ param }: { param: string | undefined }) => {
    return q === param && q === target
  }

  const isToggled = handleToggle({ param: q })
  return { isToggled, handleToggle }
}

export const Toggle = ({
  children,
  value = 'none',
  name = 'none',
  content
}: {
  children: React.ReactNode
  value: string
  name: string
  content: string | React.ReactNode
}) => {
  const { isToggled, handleToggle } = useToggle({ target: value, name: name })

  const isTablet = useMediaQuery('(min-width: 768px)')

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleChange = ({
    query,
    param
  }: {
    query: string
    param: string | undefined
  }) => {
    handleToggle({ param: value })
    const params = new URLSearchParams(searchParams)

    if (param) {
      if (isToggled) {
        params.delete(query)
      }

      if (!isToggled) {
        params.set(query, param)
      }

      const q = params.toString()
      replace(`${pathname}?${q}`, { scroll: false })
    }
  }

  return (
    <Tooltip
      className='bg-color-dark text-color-light'
      placement='bottom'
      content={content}
    >
      <Button
        isIconOnly
        size={isTablet ? 'lg' : 'sm'}
        onPress={() => handleChange({ query: name, param: value })}
        className={clsx(
          'p-1',
          isToggled ? 'bg-color-dark' : 'bg-primary-color'
        )}
      >
        {children}
      </Button>
    </Tooltip>
  )
}
