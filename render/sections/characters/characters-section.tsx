'use client'

import { useState } from 'react'
import {
  Chip,
  Divider,
  Image,
  Input,
  Select,
  SelectItem,
  Selection
} from '@nextui-org/react'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { elements } from '@/constants'
import { IconFilter, IconSearch } from '@tabler/icons-react'
import ListCharacter from '@/render/components/panel/characters/list-character'

const CharactersSection = () => {
  const [characterFilters, setCharacterFilters] = useState({
    searchValue: '',
    element: undefined
  })

  const handleChangeSearchValue = (value: string) => {
    setCharacterFilters({
      ...characterFilters,
      searchValue: value
    })
  }

  const handleChangeElement = (element: Selection) => {
    const data = Object.values(element)[0]

    setCharacterFilters({
      ...characterFilters,
      element: data
    })
  }

  return (
    <section className='space-y-4'>
      <Divider />
      <nav className='w-full grid grid-cols-6 gap-2'>
        <Input
          size='md'
          label='Buscar personaje'
          classNames={InputWrapper}
          className='col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del personaje...'
          value={characterFilters.searchValue}
          onValueChange={handleChangeSearchValue}
        />
        <Select
          label='Filtrar por elemento'
          className='col-span-2'
          classNames={selectInputWrapper}
          items={elements}
          startContent={<IconFilter />}
          placeholder='Selecciona un elemento...'
          selectedKeys={[characterFilters.element ?? '']}
          onSelectionChange={handleChangeElement}
          renderValue={(items) => {
            return items.map((item) => (
              <Chip className='capitalize' radius='sm' size='sm' key={item.key}>
                {item.data?.name}
              </Chip>
            ))
          }}
        >
          {(element) => (
            <SelectItem
              key={element.name}
              textValue={element.name}
              value={element.name}
            >
              <div className='flex items-center gap-2'>
                <Image
                  className='size-8'
                  src={element.icon}
                  alt={element.name}
                />
                <p className='text-center capitalize'>{element.name}</p>
              </div>
            </SelectItem>
          )}
        </Select>
      </nav>
      <Divider />

      <ListCharacter characterFilters={characterFilters} />
    </section>
  )
}

export default CharactersSection
