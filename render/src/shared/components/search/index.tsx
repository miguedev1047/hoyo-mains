'use client'

import {
  InputWrapperDarkest,
  selectInputWrapperDarkest
} from '@/render/src/shared/utilities/classes'
import { Figure } from '@/render/src/shared/components/figure'
import { Suspense } from 'react'
import { Input } from '@nextui-org/input'
import { Chip, Image, Select, SelectItem, Spinner } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { IconFilter, IconSearch } from '@tabler/icons-react'

interface SearchProps {
  label: string
  placeholder: string
  searchQuery: string
  className?: string
  variant?: 'flat' | 'underlined' | undefined
}

interface SelectSearchProps {
  label: string
  placeholder: string
  items: Array<any>
  searchQuery: string
  className?: string
}

export const Search = ({
  label,
  placeholder,
  searchQuery,
  variant = 'flat',
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
    replace(`${pathname}?${q}`, { scroll: false })
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Input
        variant={variant}
        label={label}
        defaultValue={searchParams.get(searchQuery)?.toString()}
        onValueChange={(value) => handleSearch(value)}
        placeholder={placeholder}
        className={className}
        startContent={<IconSearch />}
        classNames={variant !== 'underlined' ? InputWrapperDarkest : {}}
        isClearable
        size='lg'
      />
    </Suspense>
  )
}

export const SearchSelect = ({
  label,
  placeholder,
  className,
  items,
  searchQuery
}: SelectSearchProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    const targetValue = e.target.value

    if (targetValue) {
      params.set(searchQuery, targetValue)
    } else {
      params.delete(searchQuery)
    }

    const q = params.toString()
    replace(`${pathname}?${q}`)
  }

  return (
    <Suspense fallback={<Spinner />}>
      <Select
        size='lg'
        label={label}
        className={className}
        classNames={selectInputWrapperDarkest}
        items={items}
        defaultSelectedKeys={[searchParams.get(searchQuery)?.toString() ?? '']}
        startContent={<IconFilter />}
        placeholder={placeholder}
        onChange={handleSelectChange}
        renderValue={(items) => {
          return items.map((item) => (
            <Chip className='capitalize' radius='sm' size='sm' key={item.key}>
              {item.data?.title}
            </Chip>
          ))
        }}
      >
        {(item) => (
          <SelectItem textValue={item.name} key={item.value} value={item.value}>
            <div className='flex items-center gap-4'>
              {item.icon && (
                <Figure size='sm' className='p-1'>
                  <Image
                    className='w-full h-full object-cover'
                    src={item.icon}
                    alt={item.name}
                  />
                </Figure>
              )}
              <p className='text-center'>{item.title}</p>
            </div>
          </SelectItem>
        )}
      </Select>
    </Suspense>
  )
}
