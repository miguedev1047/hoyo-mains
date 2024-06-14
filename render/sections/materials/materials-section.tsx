'use client'

import { Divider } from '@nextui-org/divider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Chip, Input, Select, SelectItem, Selection } from '@nextui-org/react'
import { InputWrapper, selectInputWrapper } from '@/utils/classes'
import { IconFilter, IconSearch } from '@tabler/icons-react'
import { materialItems } from '@/constants'
import MaterialList from '@/render/components/panel/materials/list-material'

const MaterialsSection = () => {
  const router = useRouter()

  const [searchValue, setSearchedMaterial] = useState('')
  const [selectedMaterial, setSelectedMaterial] = useState<Selection>(
    new Set(['/panel/materials'])
  )

  const handleSelectMaterial = (weapon: Selection) => {
    setSelectedMaterial(weapon)

    const data = Object.values(weapon)[0]
    router.push(data)
  }

  return (
    <section className='space-y-4'>
      <Divider />
      <nav className='w-full grid grid-cols-6 gap-2'>
        <Input
          size='md'
          label='Buscar material'
          classNames={InputWrapper}
          className='col-span-4'
          startContent={<IconSearch />}
          placeholder='Escribe el nombre del material...'
          value={searchValue}
          onValueChange={setSearchedMaterial}
        />
        <Select
          label='Filtrar por material'
          className='col-span-2'
          classNames={selectInputWrapper}
          items={materialItems}
          startContent={<IconFilter />}
          placeholder='Selecciona un arma...'
          defaultSelectedKeys={selectedMaterial}
          onSelectionChange={handleSelectMaterial}
          renderValue={(items) => {
            return items.map((item) => (
              <Chip radius='sm' size='sm' key={item.key}>
                {item.data?.name}
              </Chip>
            ))
          }}
        >
          {(material) => (
            <SelectItem key={material.url} value={material.url}>
              {material.name}
            </SelectItem>
          )}
        </Select>
      </nav>
      <Divider />

      <MaterialList searchValue={searchValue} />
    </section>
  )
}

export default MaterialsSection
