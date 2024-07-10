'use client'

import { Suspense } from 'react'
import { Input } from '@nextui-org/input'
import { Chip, Image, Select, SelectItem, Spinner } from '@nextui-org/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { IconFilter } from '@tabler/icons-react'
import Figure from '@/render/components/UI/misc/figure'

interface SearchProps {
  label: string
  placeholder: string
  searchQuery: string
  className?: string
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
        label={label}
        defaultValue={searchParams.get(searchQuery)?.toString()}
        onValueChange={(value) => handleSearch(value)}
        placeholder={placeholder}
        className={className}
        classNames={InputWrapper}
        isClearable
        size='lg'
      />
    </Suspense>
  )
}

export const SelectSearch = ({
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
        classNames={selectInputWrapper}
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
          <SelectItem textValue={item.name} key={item.name} value={item.name}>
            <div className='flex items-center gap-2'>
              <Figure padding='p-0' width='w-10' height='h-10'>
                <Image
                  className='w-full h-full object-cover'
                  src={item.icon}
                  alt={item.name}
                />
              </Figure>
              <p className='text-center capitalize'>{item.title}</p>
            </div>
          </SelectItem>
        )}
      </Select>
    </Suspense>
  )
}
