'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from '@nextui-org/react'
import { useCallback } from 'react'
import { CharacterType } from '@/render/src/types'
import { columns } from '@/render/src/shared/constants'
import AscensionItem from '@/render/src/character/components/ascension/ascension-item'

interface AscensionTableProps {
  character: CharacterType
}

const AscensionTable = ({ character }: AscensionTableProps) => {
  const ascension = character?.ascensions?.map((ascension, index) => ({
    ...ascension,
    index: 1 + index++
  })) ?? []

  const renderCell = useCallback((ascension: any, columnKey: React.Key) => {
    const cellValue = ascension[columnKey as keyof any]

    switch (columnKey) {
      case 'rank':
        return (
          <div>
            <p className='text-color-light'>{ascension.index}</p>
          </div>
        )
      case 'level':
        return (
          <div>
            <p className='text-color-light'>{ascension.level}</p>
          </div>
        )
      case 'cost':
        return (
          <div>
            <p className='text-color-light'>{ascension.cost}</p>
          </div>
        )
      case 'materials':
        return (
          <ol className='min-w-[900px] grid grid-cols-4'>
            {ascension.materials.map((material: any) => (
              <AscensionItem key={material.id} material={material} />
            ))}
          </ol>
        )

      default:
        return cellValue
    }
  }, [])

  if (!ascension) return null

  return (
    <>
      <Table
        classNames={{
          wrapper: 'bg-color-darkest',
          th: 'text-color-lightest bg-color-dark'
        }}
        className='col-span-4 select-none'
        aria-label='Materials'
      >
        <TableHeader columns={columns.slice(0, 4)}>
          {(column) => (
            <TableColumn
              align={column.uid === 'actions' ? 'center' : 'start'}
              key={column.uid}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent='No hay nada para mostrar en este momento.'
          isLoading={!ascension}
          loadingContent={<Spinner />}
          items={ascension}
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
    </>
  )
}

export default AscensionTable
