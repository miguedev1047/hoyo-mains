'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'
import { Material } from '@prisma/client'
import { Divider } from '@nextui-org/divider'
import { usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import Link from 'next/link'
import ItemMaterial from '@/render/components/panel/materials/items/item-material'
import AlertError from '@/render/components/UI/errors/alert-error'
import NoItems from '@/render/components/UI/no-items'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'

const materialItems = [
  {
    name: 'Todos',
    url: '/panel/materials?type=all'
  },
  {
    name: 'Materiales de ascension',
    url: '/panel/materials?type=material_upgrade'
  },
  {
    name: 'Material local',
    url: '/panel/materials?type=material_local'
  },
  {
    name: 'Material comun',
    url: '/panel/materials?type=material_common'
  },
  {
    name: 'Material de jefe',
    url: '/panel/materials?type=material_boss'
  },
  {
    name: 'Material de jefe semanal',
    url: '/panel/materials?type=material_weekly_boss'
  },
  {
    name: 'Material mejora de armas',
    url: '/panel/materials?type=material_upgrade_weapon'
  },
  {
    name: 'Material mejora de personaje',
    url: '/panel/materials?type=material_upgrade_character'
  }
]

const MaterialsSection = () => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()
  const url = `${pathanme}?${searchParams}`

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
    <ol className='w-full grid grid-cols-5 gap-4'>
      {materials?.map((material) => (
        <ItemMaterial key={material.id} material={material} />
      ))}
    </ol>
  )
}

export default MaterialsSection
