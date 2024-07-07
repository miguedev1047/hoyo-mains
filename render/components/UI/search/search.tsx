'use client'

import { Suspense } from 'react'
import { Input } from '@nextui-org/input'
import { Spinner } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { InputWrapper } from '@/utils/classes'

interface SearchProps {
  label: string
  placeholder: string
  searchQuery: string
  className?: string
}

export const Search = ({
  label,
  placeholder,
  searchQuery,
  className
}: SearchProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (searchValue: string) => {
    const params = new URLSearchParams(searchParams)

    if (searchValue) {
      params.set(searchQuery, searchValue)
    } else {
      params.delete(searchQuery)
    }

    const q = params.toString()
    replace(`${pathname}?${q}`)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Input
        aria-label={label}
        defaultValue={searchParams.get(searchQuery)?.toString()}
        onValueChange={(value) => handleSearch(value)}
        placeholder={placeholder}
        className={className}
        classNames={InputWrapper}
        startContent={<IconSearch />}
        isClearable
        size='lg'
      />
    </Suspense>
  )
}
