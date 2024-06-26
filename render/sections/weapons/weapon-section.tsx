'use client'

import { useState } from 'react'
import { Divider } from '@nextui-org/divider'
import { Input } from '@nextui-org/input'
import { IconFilter, IconSearch } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { weaponItems } from '@/constants'
import { Chip, Image, Select, SelectItem, Selection } from '@nextui-org/react'
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

    const [data] = Object.values(weapon)
    if (data === undefined) return router.push('/panel/weapons')
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
          className='col-span-6 md:col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del arma...'
          value={searchValue}
          onValueChange={setSearchedWeapon}
        />
        <Select
          label='Filtrar por arma'
          className='col-span-6 md:col-span-2'
          classNames={selectInputWrapper}
          items={weaponItems}
          startContent={<IconFilter />}
          placeholder='Selecciona un arma...'
          selectedKeys={selectedWeapon}
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
              <div className='flex items-center gap-2'>
                <figure className='w-10 h-10 p-1 bg-primary-color rounded-md relative overflow-hidden grid place-items-center'>
                  {weapon.icon ? (
                    <Image
                      className='w-full h-full object-cover'
                      src={weapon.icon!}
                      alt={weapon.name}
                    />
                  ) : (
                    <IconFilter />
                  )}
                </figure>

                <span className='capitalize'>{weapon.name}</span>
              </div>
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
