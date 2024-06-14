'use client'

import { useState } from 'react'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { IconFilter, IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { weaponItems } from '@/constants'
import { Chip, Select, SelectItem, Selection } from '@nextui-org/react'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import WeaponList from '@/render/components/panel/weapons/list-weapon'

const WeaponsSection = () => {
  const router = useRouter()

  const [searchValue, setSearchedWeapon] = useState('')
  const [selectedWeapon, setSelectedWeapon] = useState<Selection>(
    new Set(['/panel/weapons'])
  )

  const handleSelectWeapon = (weapon: Selection) => {
    setSelectedWeapon(weapon)

    const data = Object.values(weapon)[0]
    router.push(data)
  }

  return (
    <section className='space-y-4'>
      <Divider />
      <nav className='w-full grid grid-cols-6 gap-2'>
        <Input
          size='md'
          label='Buscar arma'
          classNames={InputWrapper}
          className='col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del arma...'
          value={searchValue}
          onValueChange={setSearchedWeapon}
        />
        <Select
          label='Filtrar por arma'
          className='col-span-2'
          classNames={selectInputWrapper}
          items={weaponItems}
          startContent={<IconFilter />}
          placeholder='Selecciona un arma...'
          defaultSelectedKeys={selectedWeapon}
          onSelectionChange={handleSelectWeapon}
          renderValue={(items) => {
            return items.map((item) => (
              <Chip radius='sm' size='sm' key={item.key}>
                {item.data?.name}
              </Chip>
            ))
          }}
        >
          {(weapon) => (
            <SelectItem key={weapon.url} value={weapon.url}>
              {weapon.name}
            </SelectItem>
          )}
        </Select>
      </nav>
      <Divider />

      <WeaponList searchValue={searchValue} />
    </section>
  )
}

export default WeaponsSection
