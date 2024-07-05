'use client'

import { Input } from '@nextui-org/input'
import { IconSearch } from '@tabler/icons-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SearchCharacter = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = (character: string) => {
    const params = new URLSearchParams(searchParams)

    if (character) {
      params.set('character', character)
    } else {
      params.delete('character')
    }

    const query = params.toString()
    replace(`${pathname}?${query}`)
  }
  
  return (
    <Input
      aria-label='Buscar'
      variant='underlined'
      defaultValue={searchParams.get('character')?.toString()}
      onValueChange={(value) => handleSearch(value)}
      placeholder='Buscar...'
      className='max-w-[400px]'
      startContent={<IconSearch />}
      isClearable
      size='lg'
    />
  )
}

export default SearchCharacter
