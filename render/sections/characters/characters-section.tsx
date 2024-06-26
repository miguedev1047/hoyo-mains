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
import { elements, weapons } from '@/constants'
import { IconFilter, IconSearch } from '@tabler/icons-react'
import ListCharacter from '@/render/components/panel/characters/list-character'

const CharactersSection = () => {
  const [characterFilters, setCharacterFilters] = useState({
    searchValue: '',
    element: undefined,
    weapon: undefined
  })

  const handleChangeSearchValue = (value: string) => {
    setCharacterFilters({
      ...characterFilters,
      searchValue: value
    })
  }

  const handleChangeElement = (element: Selection) => {
    const [data] = Object.values(element)

    setCharacterFilters({
      ...characterFilters,
      element: data
    })
  }

  const handleChangeWeapon = (weapon: Selection) => {
    const data = Object.values(weapon)[0]

    setCharacterFilters({
      ...characterFilters,
      weapon: data
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
          className='col-span-6 md:col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del personaje...'
          value={characterFilters.searchValue}
          onValueChange={handleChangeSearchValue}
        />
        <Select
          label='Filtrar por arma'
          className='col-span-6 md:col-span-1'
          classNames={selectInputWrapper}
          items={weapons}
          startContent={<IconFilter />}
          placeholder='Selecciona un arma...'
          selectedKeys={[characterFilters.weapon ?? '']}
          onSelectionChange={handleChangeWeapon}
          renderValue={(items) => {
            return items.map((item) => (
              <Chip className='capitalize' radius='sm' size='sm' key={item.key}>
                {item.data?.title}
              </Chip>
            ))
          }}
        >
          {(weapon) => (
            <SelectItem
              textValue={weapon.name}
              key={weapon.name}
              value={weapon.name}
            >
              <div className='flex items-center gap-2'>
                <figure className='relative bg-primary-color w-10 h-10 p-1 flex-none rounded-md overflow-hidden'>
                  <Image
                    className='w-full h-full object-cover'
                    src={weapon.icon}
                    alt={weapon.name}
                  />
                </figure>
                <p className='text-center capitalize'>{weapon.title}</p>
              </div>
            </SelectItem>
          )}
        </Select>
        <Select
          label='Filtrar por elemento'
          className='col-span-6 md:col-span-1'
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
              textValue={element.name}
              key={element.name}
              value={element.name}
            >
              <div className='flex items-center gap-2'>
                <figure className='relative bg-primary-color w-10 h-10 p-1 flex-none rounded-md overflow-hidden'>
                  <Image
                    className='w-full h-full object-cover'
                    src={element.icon}
                    alt={element.name}
                  />
                </figure>
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
