'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Image
} from '@nextui-org/react'
import { Figure } from '@/render/src/shared/components/figure'
import { artifactColumns } from '@/render/src/shared/constants'
import { Artifact } from '@prisma/client'
import { useCallback } from 'react'
import { getStar } from '@/render/src/shared/utilities/helpers/get-star'
import Output from '@/render/src/shared/components/editor/output'

interface ArtifactTableProps {
  artifacts: Artifact[]
}

const ArtifactTable = ({ artifacts }: ArtifactTableProps) => {
  const renderCell = useCallback((artifact: Artifact, columnKey: React.Key) => {
    const cellValue = artifact[columnKey as keyof Artifact]

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex items-center gap-3 w-[240px]'>
            <Figure>
              <Image src={artifact.imageUrl!} alt={artifact.name} />
            </Figure>
            <h2 className='text-color-light text-balance'>{artifact.name}</h2>
          </div>
        )

      case 'stars':
        return (
          <Figure className='bg-transparent p-2' size='sm'>
            <Image src={getStar(artifact.stars)} alt={artifact.starsText} />
          </Figure>
        )

      case 'description':
        return (
          <div className='w-[800px]'>
            <Output description={artifact.description} />
          </div>
        )

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
      aria-label='Artifacts'
    >
      <TableHeader columns={artifactColumns}>
        {(column) => (
          <TableColumn align='start' key={column.uid}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent='No hay nada para mostrar.'
        loadingContent={<Spinner />}
        items={artifacts ?? []}
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

export default ArtifactTable
