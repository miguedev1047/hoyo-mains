'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Button } from '@nextui-org/button'
import { Material } from '@prisma/client'
import { Tooltip } from '@nextui-org/tooltip'
import { Divider } from '@nextui-org/divider'
import { Image } from '@nextui-org/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { Card, CardFooter, CardHeader } from '@nextui-org/card'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import useSWR from 'swr'
import Link from 'next/link'
import TooltipMaterials from '@/render/components/UI/tooltip/tooltip-materials'

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

  const {
    data: materials,
    isLoading,
    error
  } = useSWR<Material[]>(`/api/materials?${queryParams}`, fetcher)

  if (error) return <div>Error loading characters</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <ol className='w-full grid grid-cols-5 gap-4'>
      {materials?.map((material) => (
        <Tooltip
          key={material.id}
          placement='bottom'
          className='bg-color-dark p-4'
          content={<TooltipMaterials material={material} />}
        >
          <Card className='bg-color-dark'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <Image
                isBlurred
                width={240}
                height={240}
                classNames={{
                  wrapper: 'w-12 h-12'
                }}
                className='object-cover'
                src={material.imageUrl!}
                alt={material.name}
              />
              <h3 className='text-base font-semibold line-clamp-1'>
                {material.name}
              </h3>
            </CardHeader>
            <CardFooter className='grid grid-cols-2 gap-4'>
              <Button
                radius='sm'
                color='danger'
                variant='bordered'
                className='font-bold '
                startContent={<IconTrash />}
              >
                Delete
              </Button>
              <Button
                radius='sm'
                color='success'
                className='font-bold bg-color-success'
                startContent={<IconPencil />}
              >
                Edit
              </Button>
            </CardFooter>
          </Card>
        </Tooltip>
      ))}
    </ol>
  )
}

export default MaterialsSection
