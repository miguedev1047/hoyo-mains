'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Image,
  Tooltip
} from '@nextui-org/react'
import {
  getWeaponType,
  getWeaponTypeAlt
} from '@/render/src/database/weapons/utilities/helpers/get-weapon-type'
import { Figure } from '@/render/src/shared/components/figure'
import { weaponColumns } from '@/render/src/shared/constants'
import { WeaponType } from '@/render/src/types'
import { Weapon } from '@prisma/client'
import { useCallback } from 'react'
import { getWeaponStar } from '@/render/src/database/weapons/utilities/helpers/get-weapon-star'
import { getWeaponStat } from '@/render/src/database/weapons/utilities/helpers/get-weapon-stat'

interface WeaponTableProps {
  weapons: WeaponType[]
}

const WeaponTable = ({ weapons }: WeaponTableProps) => {
  const renderCell = useCallback((weapon: Weapon, columnKey: React.Key) => {
    const cellValue = weapon[columnKey as keyof Weapon]

    switch (columnKey) {
      case 'weapon':
        return (
          <div className='flex items-center gap-3'>
            <Figure>
              <Image src={weapon.imageUrl!} alt={weapon.name} />
            </Figure>
            <p className='text-color-light'>{weapon.name}</p>
          </div>
        )

      case 'type':
        return (
          <Tooltip
            className='bg-color-lightest text-color-darkest font-bold'
            content={getWeaponTypeAlt(weapon.type)}
          >
            <Figure>
              <Image src={getWeaponType(weapon.type)} alt={weapon.name} />
            </Figure>
          </Tooltip>
        )

      case 'stars':
        return (
          <Figure className='bg-transparent p-2' size='sm'>
            <Image src={getWeaponStar(weapon.stars)} alt={weapon.starsText} />
          </Figure>
        )

      case 'atk':
        return <h2 className='font-medium'>{weapon.atk}</h2>

      case 'main_stat':
        return <h2 className='font-medium'>{getWeaponStat(weapon.stat)}</h2>

      default:
        return cellValue
    }
  }, [])

  return (
    <Table
      classNames={{
        wrapper: 'bg-color-darkest',
        th: 'text-color-lightest bg-color-dark'
      }}
      className='col-span-4'
      aria-label='Weapons'
    >
      <TableHeader columns={weaponColumns}>
        {(column) => (
          <TableColumn align='center' key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent='No hay nada para mostrar.'
        loadingContent={<Spinner />}
        items={weapons ?? []}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
              return (
                <TableCell>
                  {renderCell(item, columnKey) as React.ReactNode}
                </TableCell>
              )
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default WeaponTable
