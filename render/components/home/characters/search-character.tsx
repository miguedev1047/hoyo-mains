'use client'

import { InputWrapper } from '@/utils/classes'
import { useFilterStore } from '@/utils/store/use-filter'
import { Input } from '@nextui-org/input'
import { IconSearch } from '@tabler/icons-react'

const SearchCharacter = () => {
  const searchCharacter = useFilterStore((state) => state.searchValue)
  const setSearchValue = useFilterStore((state) => state.setSearchValue)

  return (
    <Input
      classNames={InputWrapper}
      aria-label='Buscar'
      value={searchCharacter}
      onValueChange={(value) => setSearchValue(value)}
      placeholder='Buscar...'
      className='max-w-[400px]'
      startContent={<IconSearch />}
      isClearable
      size='lg'
    />
  )
}

export default SearchCharacter