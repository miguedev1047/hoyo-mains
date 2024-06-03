'use client'

import { materialItems } from '@/constants'
import { fetcher } from '@/utils/helpers/fetcher'
import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Divider } from '@nextui-org/divider'
import { usePathname, useSearchParams } from 'next/navigation'
import AlertError from '@/render/components/UI/errors/alert-error'
import NoItems from '@/render/components/UI/no-items'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import useSWR from 'swr'
import Link from 'next/link'
import ItemMaterial from '@/render/components/panel/materials/item-material'

const MaterialsSection = () => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()

  const paramsToString = searchParams.toString().length > 0
  const query = paramsToString ? `?${searchParams}` : ''
  const url = `${pathanme}${query}`

  return (
    <section className='space-y-4'>
      <Divider />
      <nav className='w-full'>
        <ol className='grid grid-cols-4 gap-2'>
          {materialItems.map((item) => (
            <li key={item.name}>
              <Button
                radius='sm'
                as={Link}
                href={item.url}
                fullWidth
                size='lg'
                className={`text-color-darkest font-medium ${
                  url === item.url ? 'bg-color-lightest' : 'bg-color-gray'
                } `}
              >
                {item.name}
              </Button>
            </li>
          ))}
        </ol>
      </nav>
      <Divider />

      <MaterialList />
    </section>
  )
}

const MaterialList = () => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()

  const url = `${pathanme}?${searchParams}`
  const queryParams = url.split('?')[1]

  // Fetch materials
  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>(`/api/materials?${queryParams}`, fetcher)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar los materiales.' />

  if (isLoading) return <PanelLoader />

  if (!materials?.length)
    return <NoItems message='No hay materiales para mostrar' />

  return (
    <ol className='w-full grid grid-cols-4 gap-4'>
      {materials?.map((material) => (
        <ItemMaterial key={material.id} material={material} />
      ))}
    </ol>
  )
}

export default MaterialsSection
