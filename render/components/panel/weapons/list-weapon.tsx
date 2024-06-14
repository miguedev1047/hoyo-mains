import { fetcher } from '@/utils/helpers/fetcher'
import { filterSearch } from '@/utils/helpers/filter-search'
import { Weapon } from '@prisma/client'
import { usePathname, useSearchParams } from 'next/navigation'
import ItemWeapon from '@/render/components/panel/weapons/item-weapon'
import AlertError from '@/render/components/UI/errors/alert-error'
import PanelLoader from '@/render/components/UI/loaders/panel-loader'
import NoItems from '@/render/components/UI/no-items'
import useSWR from 'swr'

const WeaponList = ({ searchValue }: { searchValue: string }) => {
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

  const weaponFiltered = filterSearch(searchValue, weapons)

  // Condicionales de renderizado
  if (error)
    return <AlertError message='Hubo un problema al cargar las armas.' />

  if (isLoading) return <PanelLoader />

  if (!weapons?.length) return <NoItems message='No hay armas para mostrar.' />

  if (!weaponFiltered?.length)
    return <NoItems message='No se ha podido encontrar esta arma.' />

  return (
    <ol className='w-full grid grid-cols-4 gap-4'>
      {weaponFiltered?.map((weapon) => (
        <ItemWeapon key={weapon.id} weapon={weapon} />
      ))}
    </ol>
  )
}

export default WeaponList
