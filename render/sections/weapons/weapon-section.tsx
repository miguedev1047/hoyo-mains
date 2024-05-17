'use client'

import { fetcher } from '@/utils/helpers/fetcher'
import { Button } from '@nextui-org/button'
import { Weapon } from '@prisma/client'
import { Divider } from '@nextui-org/divider'
import { usePathname, useSearchParams } from 'next/navigation'
import { weaponItems } from '@/constants'
import AlertError from '@/render/components/UI/errors/alert-error'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'
import ItemWeapon from '@/render/components/panel/weapons/item-weapon'
import Link from 'next/link'
import useSWR from 'swr'

const WeaponsSection = () => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()

  const paramsToString = searchParams.toString().length > 0
  const query = paramsToString ? `?${searchParams}` : ''
  const url = `${pathanme}${query}`

  return (
    <section className='space-y-4'>
      <Divider />
      <nav className='w-full'>
        <ol className='grid grid-cols-6 gap-2'>
          {weaponItems.map((item) => (
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

      <WeaponList />
    </section>
  )
}

export default WeaponsSection

const WeaponList = () => {
  const pathanme = usePathname()
  const searchParams = useSearchParams()

  const url = `${pathanme}?${searchParams}`
  const queryParams = url.split('?')[1]

  // Fetch weapons
  const {
    data: weapons,
    isLoading,
    error
  } = useSWR<Weapon[]>(`/api/weapons?${queryParams}`, fetcher)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar las armas.' />

  if (isLoading) return <PanelLoader />

  if (!weapons?.length) return <NoItems message='No hay armas para mostrar.' />

  return (
    <ol className='w-full grid grid-cols-5 gap-4'>
      {weapons?.map((weapon) => (
        <ItemWeapon key={weapon.id} weapon={weapon} />
      ))}
    </ol>
  )
}
