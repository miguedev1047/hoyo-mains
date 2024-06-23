'use client'

import { useCallback } from 'react'
import { characterType } from '@/render/services/home/characters/data'
import { columnsHome } from '@/constants'
import { Ascension } from '@/types'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from '@nextui-org/react'
import CharacterAscensionMaterialItem from '@/render/components/home/characters/table/character-ascension-material-item'

const CharacterAscensionTable = ({
  character
}: {
  character: characterType | undefined
}) => {
  return (
    <div className='col-span-4 space-y-4'>
      <h3 className='text-xl font-semibold text-secondary-color'>
        <span className='capitalize'>{character?.name} </span>
        Mejoras de Ascensión
      </h3>
      <AscensionTable character={character} />
    </div>
  )
}

const AscensionTable = ({
  character
}: {
  character: characterType | undefined
}) => {
  const ascension = character?.ascensions.map((ascension, index) => ({
    ...ascension,
    index: 1 + index++
  }))

  const renderCell = useCallback((ascension: any, columnKey: React.Key) => {
    const cellValue = ascension[columnKey as keyof Ascension]

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
          <ol className='min-w-[975px] grid grid-cols-4'>
            {ascension.materials.map((material: any) => (
              <CharacterAscensionMaterialItem
                key={material.id}
                material={material}
              />
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
          wrapper: 'bg-color-darkest ',
          th: 'text-color-lightest bg-color-dark'
        }}
        aria-label='Materials'
      >
        <TableHeader columns={columnsHome}>
          {(column) => (
            <TableColumn key={column.uid}>{column.name}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent='No hay nada para mostrar.'
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

export default CharacterAscensionTable
