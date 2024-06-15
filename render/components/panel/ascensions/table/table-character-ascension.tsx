import { columns } from '@/constants'
import { Ascension, Characters } from '@/types'
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
import ItemMaterial from '@/render/components/panel/ascensions/item-material'
import TableActions from '@/render/components/panel/ascensions/table/table-actions'
const TableCharacterAscension = ({
  character
}: {
  character: Characters | undefined
}) => {
  const ascension = character?.ascensions.map((ascension, index) => ({
    ...ascension,
    index: 1 + index++
  }))

  const renderCell = useCallback(
    (ascension: Ascension, columnKey: React.Key) => {
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
              {ascension.materials.map((material) => (
                <ItemMaterial
                  key={material.id}
                  character={character}
                  material={material}
                />
              ))}
            </ol>
          )
        case 'actions':
          return <TableActions character={character} ascension={ascension} />
        default:
          return cellValue
      }
    },
    [character]
  )

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
        <TableHeader columns={columns}>
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
          emptyContent='No hay nada para mostrar. Agrega un nivel de ascensión.'
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

export default TableCharacterAscension
